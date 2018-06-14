# WebReports.io Official NodeJS Client
Official Client to generate reports using WebReports.io


WebReports.io is a new Reports as a Service. You can design reports using a drag and drop interface, give them a key, and simply generate previews or PDFs by calling the functions provided by the API.

If you want to know more about WebReports, go to the [WebReports.io website](https://webreports.io) and sign up.

Free tier comes with thousands of API requests per month that makes it practically free for most use cases.


### Install:

```javascript
	npm install webreports.io-client --save
```

### Usage:

```javascript
	let webReports=require('webreports.io-client')({key:<Your API Key Here>});
```

### Getting Started

#### Designing a Report

1. Sign up and/or login on WebReports.io
2. Click on Projects button in the navigation and click **New Project**. Give a sensible name and a unique key to your project and click Create. Then click on Reports button in the navigation and click **Add New Report**, name your report and give it a unique key such as "order_invoice", click Create and Design. You can come back to WebReports.io and hover on the created report to go back to working on its design.
3. You can create labels, images, tables, and boxes. To style the your components, give it a name using the toolbar, and click Edit CSS. You can then use attribute selectors to style your components, i.e. `[data-name="<component name here>"]{ <CSS Properties> }`
4. For your components to auto adjust when the dynamic data arrives, you need to setup anchors. To see how anchors work, you should [watch this video](https://webreports.io/how-to-design).
5. Make sure you save your progress routinely using the **Save** button. If you want to see how your design will look when printed, you can click on Print Preview and then click on Save button again to make the preview refresh.
6. To change the text of a label, select the label and click **Edit Data** in the toolbar. In the text area that comes, change the value of the "text" property.
7. To change the columns of a table, select the table and click **Edit Data** in the toolbar. In the text area that comes, change the value of the "columns" and "rows" keys. Formats are specified in the bottom of the readme.

#### Inserting dynamic data in the report

1. You will need to generate API keys first. Go to WebReports.io
2. Click on API Keys in the navigation and click Generate an API Key
3. When you need to paste the API key, you can hover on the created API key and click on copy to clipboard
4. Paste the API key in your require call, i.e. `let webReports=require('webreports.io-client')({key:<Your API Key Here>});`



### Use seamlessly with ExpressJS


```javascript
webReports.expressSetup(projectKey,{
    router:expressRouter, //Object returned by express.Router();
    handler:async (req,res)=>{
        //Return your report data here
    },
    previewEndpoint:'/report' //optional,
    pdfEndpoint:'/getpdf' //optional
);
```


### or as per your requirement

**To Generate a PDF of your designed report with dynamic data**

*Returns a stream containing PDF data, you can pipe it into a response object to force download.*

```javascript
await webReports.generateReport(projectKey,reportKey,reportData); //projectKey is the key identifying your project, and reportKey is the key you name using the designer
```

*Returns a stream containing HTML data. You can pipe it into a response with your own route that you can load in an iframe*

**To get a self-contained HTML preview page of your designed report with dynamic data**

```javascript
await webReports.previewReport(projectKey,reportKey,reportData); //projectKey is the key identifying your project, and reportKey is the key you name using the designer
```

### Format of the dynamic data

The report data needs to be an object containing the keys matching the names of components that you have created in the report. Report Data object can be sparse, i.e. you can provide a blank object or provide only the keys that you want.

For example, if your report has one label that is named `employeeName` and two tables named `disbursedSalaries` and `attendance` respectively, your report data can be `{employeeName:{text:'Theodore Roosevelt'}, disbursedSalaries:{ rows:[[<Strings containing row 1 data>],[<Strings containing row 2 data>],...] }}`. If you don't provide data for `attendance` table, the report will use the already provided rows.

### Styling
Styling is completely independent of the data, and hence must be styled using **Edit CSS** feature of the WebReports.io designer. You can add any styles that you want that affect only local components or globally using tag selectors. All CSS selectors are supported.


### Components and their Data

The data you send from your API needs to match the keys that each component expects. To see how your report looks with actual data, you can insert this data straight from the WebReports.io designer.

```javascript
//Labels
{
   "text":"<Text that label should have>"
}

//Tables
{
   "columns":[
      [["table header row 1 col 1"], ["table header row 1 col 2"],...],
      ...//more header rows  if needed
   ],
   "rows":[
      [["table data row 1 col 1"], ["table data row 1 col 2"],...],
      ...//more data rows  if needed
   ]
}
```

### License and Support

Using this client library is free and is backed by MIT license. Feel free to create pull requests or create issues if you wish.

If you need commercial support, please write to [The WebReports support](support@bysness.com)

