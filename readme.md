
# react-common-admin

A react page container that works with [react-parse](https://www.npmjs.com/package/react-parse)  to fetch data from server and display as table/gallery or customs component.

![demo](https://github.com/doronnahum/react-common-admin/blob/master/Aug-14-2018%2009-21-58.gif)

## Installation
You need to install:
[Ant Design](https://ant.design/)
```bash
npm i react-common-admin --save
```

## Basic Usage
```jsx
import  React  from  'react';
import {CommonAdmin, fields} from  'react-common-admin'
import {DocFields, TableField} from  './config';

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

## documentProps
| key | type | Description|
|-----|--|--|
fields|array <br/><small>required<small></small></small>| we use [react-cross-form](https://github.com/doronnahum/react-cross-form#readme)
wrapper|element|You can replace the default side modal wrapper , wrapper get this props <br />{<br />isOpen: bollean,<br /> onClose: function,<br />title: string,<br /> children: react children<br />}|
viewComponent|element|See document viewComponent props
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
showCloseButton|boolean
### document viewComponent props
-----
```jsx
{
	fetchProps - see react-parse fetchProps;
	onClose, - function - call to close modal
	isOpen - boolean - is modal open
	objectId, - string - empty on new document
	saveOnBlur, - boolean
	fields, - array
	fieldsOptions - fetchExtraData is pass to document as fieldsOptions - pass only for fields that contain a targetName, the key for each value in fieldsOptions is the targetName
	extraData - all fetchExtraData results,
	... all other parameters from your documentProps configuration
}
```
## collectionProps

| key | type | Description|
|-----|--|--|
fields|array <br/><small>required<small></small></small>| [{key: 'objectId', title: 'Object Id', search: true, formatter: () => {}} ]
viewComponent|element|See collention viewComponent props
title|string|title to display
limit|number|react-parse limit value , default is 10
skip|number|react-parse skip value , default is 0,
order|string|react-parse string, default is 'createdAt'
query|object|react-parse query, default is {}
onLimitChanged|funciton|if you didn't pass this handlers than your limit is used as initial value and react-common-admin will handle the changes
onSkipChanged|funciton|
onOrderChanged|funciton|
onPagination|funciton|
onQueryChanged|funciton|
tableProps|object| any props you want to pass to the viewComponent
### collention viewComponent props
------
```jsx
{
	fetchProps - see react-parse fetchProps 
	fields - array
	dataHandler - see react-parse dataHandler (clodeCode)
	extraData - all fetchExtraData results
	title - string
	onCreateNewDoc- function - call this and document modal will display, you can pass as first parameter any data you want and document will get this on props.dataFromCollection
	onEditDoc- function - call this with objectId and document modal will display to edit, you can pass as seconde parameter any data you want and document will get this on props.dataFromCollectio
	skip - number
	limit - number
	// function to call when you want to set a new value
	onLimitChanged: (limit: number) => {...}
	onSkipChanged: (skip: number) => {...}
	onOrderChanged: (order: string => {...}
	onQueryChanged: (query: object) => {...}
	onPagination: (page: number, pageSize: number) => {...}
	... all other parameters from your collectionProps configuration
}
```

### collention - tableProps options
-----
| key | type | Description|
|-----|--|--|
|renderAddBtn|function|funciton that get all table props and need to return a button|
customOnEdit|function| funciton that be call when user click on edit button, with the row and all table props (rowObjectId, tableProps) => {...}
renderAddBtn example 

```jsx
renderSelectTypeToAdd(res) {
const  productTypes  =  objDig(res, 'extraData.ProductType') || []
const  onSelect  = (menuItem) => {
res.onCreateNewDoc(menuItem.item.props.value)
}
return (
	<Dropdown 
		overlay={
			<Menu  onClick={onSelect}>
			{productTypes.map(item  => {
			return  <Menu.Item  key={item.objectId}  value={item}>{item.name}</Menu.Item>
			})}</Menu>
		}
		>
		<Button  style={{ marginLeft: 8 }}>
			Add <Icon  type="down" />
		</Button>
	</Dropdown>
)
}
...
...
<CommonAdmin
...
collectionPops: {
...
tableProps: {
renderAddBtn: this.renderSelectTypeToAdd,
}
...
```



### react-parse fetchProps
see full details in [react-parse docs](https://github.com/doronnahum/react-parse#fetchprops)
{data, error, status, info. isLoading, refresh, cleanData, put, post, deleteDoc, updateField}

### Need only a documet witout list?
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

## DraggableTable example
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
		}
...
```
