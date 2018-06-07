let request=require('request');
let rp=require('request-promise-native');
module.exports=(options={})=>{
    return new function () {
        /*
        * PLEASE READ:
        *
        * Wherever we need to send plain responses, we use the request-native-promise library
        * because it uses native ES6 promises.*
        *
        * Wherever we need to stream the responses, we are using request library because
        * request-native-promise discourages streaming using over the promises.
        *
        * */


        this.key=options.key || '';
        this.url=options.overrideURL || 'https://webreports.io/api/';
        this.testAPIKey=async ()=>{
            return await rp({
                uri: this.url + 'testapikey',
                qs: {
                    key: options.key
                },
                headers: {
                    'User-Agent': 'WebReports.io-client'
                },
                json:true
            });
        }
        this.expressSetup=async({router,handler,previewEndpoint='/report',pdfEndpoint='/getpdf'})=>{
            router.get(previewEndpoint,async (req,res)=>{
                let reportData=await handler(req,res);
                this.previewReportExpress(req.query.reportKey,reportData,res);
            });
            router.get(pdfEndpoint,async (req,res)=>{
                let reportData=await handler(req,res);
                this.downloadReportExpress(req.query.reportKey,reportData,res);
            });
        }
        this.downloadReportExpress=async(reportKey,reportData,res)=>{
            let reportRes=await this.generateReport(reportKey,reportData);
            if(reportRes.pipe)
            {
                return reportRes.pipe(res);
            }
            else{
                res.write('Error downloading report. Could not stream.');
                res.end();
            }
        }
        this.previewReportExpress=async(reportKey,reportData,res)=>{
            let reportRes=await this.previewReport(reportKey,reportData);
            if(reportRes.pipe)
            {
                return reportRes.pipe(res);
            }
            else{
                res.write('Error previewing report. Could not stream.');
                res.end();
            }
        }
        this.generateReport=async (reportKey,reportData)=>{
            return request({
                method:'post',
                uri: this.url + 'generate_report',
                body:{
                    apiKey:this.key,
                    reportKey,
                    reportData,
                },
                headers: {
                    'User-Agent': 'WebReports.io-client'
                },
                json:true
            })
        }
        this.previewReport=async (reportKey,reportData={})=>{
            return request({
                method:'post',
                uri: this.url + 'preview_report',
                body:{
                    apiKey:this.key,
                    reportKey,
                    reportData,
                },
                headers: {
                    'User-Agent': 'WebReports.io-client'
                },
                json:true
            })
        }
    }
};