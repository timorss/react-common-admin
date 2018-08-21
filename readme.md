
# react-common-admin

A react page container that works with [react-parse](https://www.npmjs.com/package/react-parse)  to fetch data from server and display as table/gallery or customs component.


![enter image description here](https://lh3.googleusercontent.com/SIsABVRWjGloAHiU2wrcRJGA2aGyeaE4k5V_y3hFeUwYdCyKReNNFmlzZtE6k7hKvic8tGkaV4Vyqg "screenRecord")
## Table of content

- [Installation](#installation)
- [initCommonAdmin](#init-react-common-admin)
	- [notification](#notification) 
	- [defaultDocumentMessages](#defaultdocumentmessages) 
	- [langDir](#langdir) 
	- [customTitle](#customtitle) 
	- [setParams](#setparams) 
	- [getParams](#getparams) 
- [Basic Usage](#basic-usage) 
- [Props](#props) 
	- [Document Props](#documentprops)
		- [View Component](#document-viewcomponent)
		- [Wrapper Component](#document---wrapper)
	- [Collection Props](#collectionprops)
		 - [View Component](#collention-viewcomponent)
			- collection view Component ready to use
				- [Table - is the default](#table)
				- [DraggableTable](#draggabletable)
- [Document witout list](#document-witout-list)
- [DraggableTable example](#draggabletable-example)
- [CustomTitle](#customtitle)
- [Fields](#fields)
	- [TextInput](#textonput)
	- [TextArea](#textarea)
	- [MobileInput](#mobileinput)
	- [UploadFile](#uploadfile)
	- [SelectFromMedia](#selectfrommedia)
	- [NumberInput](#numberinput)
	- [DateTime](#datetime)
	- [Pointer](#pointer)
	- [ArrayOfPointer](#arrayofpointer)
	- [ArrayOfPointerTableView ](#arrayofpointertableview )
	- [DropDown ](#dropdown )
	- [ObjectsDropDown](#objectsdropdown)
	- [AddressAutoComplete  ](#addressautocomplete  )
	- [AddressWithMapView ](#addresswithmapView )
	- [Tags](#tags)

## Installation
 1. First you need to install:
[Ant Design](https://ant.design/) 

 2. Install react-common-admin
	```bash
	npm i react-common-admin --save
	```

 3. Init react-common-admin
     
	 ```jsx
	 //     inside your root component
	 import { initCommonAdmin } from  'react-common-admin';
	 
	initCommonAdmin({
		notification,
		defaultDocumentMessages,
		langDir,
		customTitle,
		setParams,
		getParams
	})
	```




## Init react-common-admin
initCommonAdmin exmples for of the options
### notification 
```jsx
/*
	notification service -
	You can pass a notification service and
	react-common-admin will trigger a notification
	in each put/post/delete action
*/
const  notification  = {
	success: (message) => console.log('success', message),
	error: (message) => console.log('error', message),
	info: (message) =>  console.log('info', message),
	warning: (message) => console.log('warning', message),
	warn: (message) =>  console.log('warn', message),
}
```
### defaultDocumentMessages
```jsx
/*
	notification default messages -
	You can pass a default notification messages
*/
const  defaultDocumentMessages  = {
	onPostMessage: 'Created successfully',
	onPostFailedMessage: 'document - Created failed',
	onPutMessage: 'Update successfully',
	onPutFailedMessage: 'document - Update failed',
	onDeleteMessage: ' Deleted successfully',
	onDeleteFailedMessage: ' Deleted failed'
}
```
### langDir
```jsx
const langDir = 'ltr' // You can set 'rtl' or 'ltr'
```
### customTitle
```jsx
/*
	document customTitle-
	You can pass a function that get a
	props and return the title to diaplay
	in the document header
*/
const  customTitle  =  function ({ state, props }) {
	const { data } =  state;
	const { objectId, schemaName, titleKey } =  props
	let  title  =  '';
	const  isNew  =  !objectId;
	if (isNew) {
	title  = `Create a New ${schemaName} document`
	} else {
	let  titleFromKey  = (titleKey  &&  data) ? data[titleKey] :  ''
	let  hasTitle  = titleFromKey.length
	title  = `Edit ${schemaName} document - ${hasTitle  ?  titleFromKey  :  objectId}`
}
return  title;
}
```
### setParams
```jsx
/*
	If you want to persist the user work when the page is full reload,
	we need an access to URL params, pass setParams and setParams
*/
const  setParams  =  function (key, value) {
	const href  =  `${Router.pathname}?${key}=${value}`
	const  as  =  href
	Router.push(href, as, { shallow:  true })
}
```
### getParams
```jsx
import  Router  from  'next/router'; // You can use any Router service you want

const  getParams  =  function () {
	return  Router.query
}
```


## Basic Usage

> You can use any inputs you want, not only from library fields


```jsx
import  React  from  'react';
import {CommonAdmin, fields} from  'react-common-admin'

const DocFields = [ // See react-cross-form
{
	key: 'firstName',
	label: 'First Name',
	validators: { presence: true, length: { minimum: 2 } },
	component: fields.TextInput
}]

const TableField = [
{ key: 'objectId',
  title: 'Object Id'
 },
 { key: 'firstName',
  title: 'First Name'
 }
]
export  default  class  Example  extends  React.Component {
render() {
	return (
		<div>
			<CommonAdmin
				schemaName='Example'
				targetName='ExampleScreen'
				title='Example Screen'
				documentProps={{
					fields: DocFields, // Define this fields you want to render
				}}
				collectionProps={{
					fields: TableField
				}}	
			/>
		</div>
	);
}}
```

## Props
| key | type | Description|
|-----|--|--|
|title|string|title to dispaly|
|targetName|string <br/><small>required<small></small></small>|react-parse targetName|
|schemaName|string <br/><small>required<small></small></small>|react-parse schemaName|
functionName|string| react-parse functionName <br/> <small><small>When you using clude code the delete from table is not enabled</small></small>
onVisibleDocumentsChanged|function| Function that be call when VisibleDocuments state is changed
fetchExtraData|array|array of objects, each object is react-parse collection configuration <br />[{schemaName: 'Member', targetName: 'MemberData'}]<br/> The data will be avilable for you in the components
documentProps|object <br/><small>required<small></small></small>| See documentProps
collectionProps|object <br/><small>required<small></small></small>| See collectionProps
openAsFullDoc|boolean<br/><small>default: true<small></small></small>|, set false if you want the document to open as a half screen
paramSync|boolean<br/><small>default: true<small></small></small>|set false if you didnt want to sync visibleDocument with url parms
refreshExtraDataOnRefresh|boolean<br/><small>default: true<small></small></small>|When true, react-parse will fetch data to all extra data and not only document/collection 

## documentProps
| key | type | Description|
|-----|--|--|
fields|array <br/><small>required<small></small></small>| we use [react-cross-form](https://github.com/doronnahum/react-cross-form#readme)
wrapper|element|You can replace the default side modal wrapper , wrapper get this props <br />{<br />isOpen: bollean,<br /> onClose: function,<br />title: string,<br /> children: react children<br />}|
title|string|title to display
customTitle|function| function that get {state, props} and return string as title
parseDataBeforePost|function| optional - function that call with the data before post, (data, tableProps) => {return ({...data, {test: 1})}
parseDataBeforePut|function| optional - function that call with the data before put, (data, tableProps, objectId, docFetchProps) => {return ({...data, {test: 1})}
saveOnBlur|boollean| default is true, run react-parse put when input is blur
messages| object| You can display a custom message, this data will pass to your notification service, see  initCommonAdmin
onPostFinished|function|react-parse onPostFinished
onPutFinished|function|react-parse onPutFinished
onDeleteFinished|function|react-parse onDeleteFinished
showDeleteButton|boolean|
showCloseButton|boolean|
viewComponent|element| default is DocForm but you can pass your custom component, See document viewComponent props for more information



## document viewComponent

**How to pass your component ?**
```jsx
import MyDocView from './MyDocView'
...
return (
<CommonAdmin
	...
	documentProps={{
		viewComponent: MyDocView 
	}}
	...
```
**What props you will get ?**
| key | type | Description|
|-----|--|--|
|fetchProps |object|See [react-parse fetchProps](https://github.com/doronnahum/react-parse#fetchprops)|
onClose|function |Call to close modal (relevant when the document wrapper is modal)
isOpen |boolean| True when this modal is open
objectId|string| Parse document id, empty on new document 
saveOnBlur| boolean| The value from your CommonAdmin>documentProps configuraion
fields|array|The value from your CommonAdmin>documentProps configuraion|
fieldsOptions |object|FetchExtraData is pass to document as fieldsOptions - pass only for fields that contain a targetName.<br />the key for each value in fieldsOptions is the targetName
extraData | object| all fetchExtraData results
...||Any other parameters you set inside documentProps will pass to your viewComponent

### document - wrapper
The default wrapper is a side modal bot you can use hower modal like that
```jsx
import {Modal} from 'react-coomon-admin
...
return (
<CommonAdmin
	...
	documentProps={{
		wrapper: Modal
	}}
	...
/>
```
And you can customize The wrapper like that
```jsx
import Modal from './rect-some-modal-component'

class  MyDocWrapper extends  React.Component {
	render() {
		const {isOpen, onClose, modalId} =  this.props
		return(
			<Modal isOpen={isOpen} onClose={() => onClose(modalId)} >
				{children}
			</Modal>
		)
	}
}

export default class  MyScreen extends  React.Component {
	render() {
		return(
			<CommonAdmin
				...
				documentProps={{
					wrapper: MyDocWrapper
				}}
				...
			/>
		)
	}
}
```

## collectionProps

| key | type | Description|
|-----|--|--|
fields|array <br/><small>required<small></small></small>| [{key: 'objectId', title: 'Object Id', search: true, formatter: (cell, row) => {}} ]
title|string|title to display
limit|number|react-parse limit value , default is 10
skip|number|react-parse skip value , default is 0,
order|string|react-parse string, default is 'createdAt'
query|object|react-parse query, default is {}
dataHandler |funciton| react-parse dataHandler 
onLimitChanged|funciton|if you didn't pass this handlers than your limit is used as initial value and react-common-admin will handle the changes
onSkipChanged|funciton| optional - only if you want to override power function and take the control of this value
onOrderChanged|funciton|optional - only if you want to override power function and take the control of this value
onPagination|funciton|optional - only if you want to override power function and take the control of this value
onQueryChanged|funciton|optional - only if you want to override power function and take the control of this value
tableProps|object| any props you want to pass to the viewComponent
...||Any other parameters you set inside collectionProps will pass to your viewComponent
viewComponent|element|See collention viewComponent propsviewComponent
## collention viewComponent
**How to pass your component ?**
```jsx
import MyTablView from './MyDocView'
...
return (
<CommonAdmin
	...
	collectionProps={{
		viewComponent: MyTablView 
	}}
	...
```
**What props you will get ?**
| key | type | Description|
|-----|--|--|
extraData | object| All fetchExtraData results
|fetchProps |object|See [react-parse fetchProps](https://github.com/doronnahum/react-parse#fetchprops)
fields	|array	|The value from your CommonAdmin>collentionProps configuraion
onCreateNewDoc|function |Call this and document modal will display, you can pass as first parameter any data you want and document will get this on props.dataFromCollection
onEditDoc|function | Call this with objectId and document modal will display to edit, you can pass as seconde parameter any data you want and document will get this on props.dataFromCollectio
skip| number| Current skip value
limit |number| Current limit value
|onLimitChanged|function | Call to set new limit value<br/> onLimitChanged(20)
|onSkipChanged|function |Call to set new skip value<br/> onSkipChanged(20)
|onOrderChanged|function |Call to set new order value<br/> onOrderChanged('createdAt')
|onPagination|function |Call to set new limit and skip value<br/> onPagination(page, limit)<br/>We caliculate skip from page like that:<br/> skip = (page  -  1) *  limit
...||Any other parameters you set inside collentionProps will pass to your viewComponent
## Table
The default collection viewComponent is Table
You can pass inside collentionProps tableProps  object to customize some things in the table
```jsx
...
return (
<CommonAdmin
	...
	collectionProps={{
		tableProps : {
			disabledDelete: true
		}
	}}
	...
```
### tableProps options
-----
| key | type | Description|
|-----|--|--|
|renderAddBtn|function|funciton that get all table props and need to return a button|
customOnEdit|function| funciton that be call when user click on edit button, with the row and all table props (rowObjectId, tableProps) => {...}
renderAddBtn |function|funciton that be call when user click on add button
disabledDelete|boolean|Set true to hide the delete button
### renderAddBtn exmple
```jsx
return (
<CommonAdmin
	collectionPops: {
		tableProps: {
			renderAddBtn: (props) => {
				return <button onClick={() => {
					props.onCreateNewDoc()
				}}>Add</button>
			},
		}
...
/>
```
## DraggableTable
By default collection render a table, if you want you can pass as viewComponent a DraggableTable, it is like the regular table with the ability to drag row and change value in the DB base user drag and drop
```jsx
import {CommonAdmin, DraggableTable} from  'react-common-admin';
<CommonAdmin
...
	collectionProps={{
	...
		viewComponent:  DraggableTable,
		tableProps: {
			orderKey:  'orderKey' // in this case each document in the DB contain orderKey key with value that help us render the view by a specific order
		// optional
		groups: ['related', 'child'], // render data in separate tables
		groupBy: 'relationType', // key to group value
			
		}
...
```

## document witout list
### Need only a documet ?
See this example
```jsx
import React from 'react';
import {CommonAdmin, StaticDoc} from 'react-common-admin'
import {DocFields} from './config';

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <CommonAdmin
          schemaName='Member'
          targetName='ProfileSettings'
          title='Profile Settings'
          showCollection={false} //--------------->!important
          documentProps={{
            fields: DocFields,
            objectId: 'eviegCusH8',
            wrapper: StaticDoc, //--------------->!important
            messages: {
              onPostMessage: 'Create successfully',
              onPostFailedMessage: 'Create failed',
              onPutMessage: 'Update successfully',
              onPutFailedMessage: 'Update failed):',
              onDeleteMessage: 'Deleted successfully',
              onDeleteFailedMessage: 'Deleted failed'
            },
            customTitle: ({objectId, data}) => { 'title' }
          }}
          fetchExtraData={[
            {schemaName: 'City', targetName: 'CityDropDown'},
          ]}
        />
      </div>
    );
  }
}

```

### customTitle
When you init with customTitle you can use it like that:
```
import { CommonAdmin, customTitle } from  'react-common-admin'
	<CommonAdmin
		schemaName='Example'
		targetName='ExampleScreen'
		title='Example Screen'
		documentProps={{
		fields: DocFields, // Define this fields you want to render
		customTitle: customTitle,
		titleKey: 'firstName',
		include: 'imageFromMedia'
...
}}
```

## fields
react-common-admin fields
```jsx
import {fields} from 'react-common-admin'
```
available fields
```jsx
const {
	TextInput, NumberInput, MobileInput,
	UploadFile, DateTime, Pointer, DropDown,
	ObjectsDropDown, AddressAutoComplete,
	GeoLocationMapView, AddressWithMapView,
	Tags, ArrayOfPointer, ArrayOfPointerTableView, TextArea
} =  fields;
```
## Fields Examples

### TextInput
```jsx
{
	key:  'firstName',
	label:  'First Name',
	validators: { presence:  true, length: { minimum:  2 } },
	component:  fields.TextInput,
	helpText:  'Please tell as what is your name'
},
```
### TextArea
```jsx
{
	key:  'info',
	label:  'Whe are you',
	component:  fields.TextArea,
	helpText:  'I am example of a textArea'
},
```
### MobileInput
We use 'libphonenumber-js to validate the phone number
import { isValidNumber } from  'libphonenumber-js'
```jsx
{
	key:  'mobile',
	label:  'Mobile',
	customValidation:  function (field, value) {
		let  errors  = []
		if(!value  ||  value  ===  '') {
		errors.push('can\'t be blank')
		} else  if(!isValidNumber(value)) {
		errors.push('Please enter a valid phone number')
		}
		return  errors
	},
	component:  fields.MobileInput,
},
```
### UploadFile

 1. Upload file to parse File Field


```jsx
{
	key:  'image',
	label:  'Image as Parse File Example',
	component:  fields.UploadFile,
	validators: { presence:  true }
},
```

 2. Upload file and save as url sring


```jsx
{
	key:  'urlString', // Example how to upload an image an set a url string and not parse file object;
	label:  'Image - image as string example',
	component:  fields.UploadFile,
	validators: { presence:  true },
	fileValueHandler: (res) => {
		return  res.data.url
	}
},
```
### SelectFromMedia

 1. Select file from media screen and save as pointer to media collection

```jsx
{
key:  'imageFromMedia',
label:  'imageFromMedia - image as pointer to Media',
component:  fields.SelectFromMedia,
asPointer:  true,
validators: { presence:  true }
},
```

 2. Select file from media screen and save as string url

```jsx
{
key:  'imageFromMediaAsString',
label:  'imageFromMediaAsString - image as string from Media',
component:  fields.SelectFromMedia,
validators: { presence:  true }
},
```

### NumberInput
```jsx
{
	key:  'age',
	label:  'Age - number input example',
	component:  fields.NumberInput,
},
```
### DateTime
```jsx
{
	key:  'birthday',
	label:  'Birthday',
	component:  fields.DateTime,
},
```
### Pointer
```jsx
{
	key:  'city',
	label:  'City - pointer fields example',
	component:  fields.Pointer,
	schemaName:  'City',
	targetName:  'CityDropDown',
	labelKey:  'name'
},
```
### ArrayOfPointer
drop down with multi select
```jsx
{
	key:  'roles',
	label:  'Roles',
	component:  fields.ArrayOfPointer,
	schemaName:  'City',
	targetName:  'CityDropDown',
	labelKey:  'name'
}
```
### ArrayOfPointerTableView 
Table with switch button in each row
```jsx
{
	key:  'cities',
	label:  'Cities',
	component:  fields.ArrayOfPointerTableView,
	schemaName:  'City',
	targetName:  'CityDropDown',
	labelKey:  'name'
},
```
### DropDown
select string from array of static options
```jsx
{
	key:  'favoriteColor',
	label:  'Favorite Color - dropDown static options example - string value',
	component:  fields.DropDown,
	options: [
		{key: 'red', label: 'red'},
		{key: 'green', label: 'green'},
		{key: 'blue', label: 'blue'},
		{key: 'pink', label: 'pink', customRender: ({label}) =>  <p style={{color: 'pink'}}>{label}</p>},
	]
}
```
### ObjectsDropDown
select object from array of static options
```jsx
{
	key:  'favoritePhone',
	label:  'Favorite Phone - dropDown static options example - object value',
	component:  fields.ObjectsDropDown,
	valueKey:  'model', // default is key
	labelKey:  'fullName', // default is label
	options: [
		{company:  'Samsung', OS:  'Android 8', model:  'Galaxy S9 Plus', fullName:  'Samsung Galaxy S9 Plus'},
		{company:  'Samsung', OS:  'Android 8', model:  'Galaxy S9', fullName:  'Samsung Galaxy S9'},
		{company:  'Huawei', OS:  'Android 8.1', model:  'P20 Pro', fullName:  'Huawei P20 Pro'},
	]
},
```
### AddressAutoComplete
input with autocomplete off location
```jsx
{
	key:  'address',
	label:  'Address',
	component:  AddressAutoComplete,
	accessToken:  envConfig.MAP_BOX_ACCESS_TOKEN
},
```
### AddressWithMapView
address string and geoLocation at the same document
```jsx
{
	key:  'group-address',
	addressFieldKey:  'address',
	locationFieldKey:  'location',
	component:  AddressWithMapView,
	group: [
		{
		key:  'address',
		label:  'Address',
		component:  AddressAutoComplete,
		accessToken:  envConfig.MAP_BOX_ACCESS_TOKEN
		},
		{
		key:  'location',
		label:  'Location',
		component:  GeoLocationMapView,
		accessToken:  envConfig.MAP_BOX_ACCESS_TOKEN
		},
	],
},
```
### Tags
```jsx
{
	key:  'tags',
	label:  'Tags',
	component:  Tags, // Good for array of string
	validators: { presence:  true, length: { minimum:  2 } },
	helpText:  'Set tags to help the search engine what you want in the future'
},
```
