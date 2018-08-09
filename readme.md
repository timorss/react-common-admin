
# react-common-admin

A react page container that works with [react-parse](https://www.npmjs.com/package/react-parse)  to fetch data from server and display as table/gallery or customs component.


[react-parse](https://www.npmjs.com/package/react-parse) + [react-cross-inputs](https://github.com/doronnahum/react-cross-inputs) + [react-cross-form](https://github.com/doronnahum/react-cross-form)
as a one unit with table and document view

## Installation
You need to install:
[Ant Design](https://ant.design/) 
[styled-components](https://github.com/styled-components/styled-components)
```bash
npm i react-common-admin --save
```

### Inside root component
(In nextjs use _app.js)
```jsx
import {initCommonAdmin} from 'react-common-admin';
import { notification } from 'antd';
const langDir = 'ltr'

initCommonAdmin({notification, langDir})

```

### You need to import the css to your root file or in the relevant screens
import 'react-common-admin/src/style.css';

## Basic Usage
```jsx
import  React  from  'react';
import {CommonAdmin, fields} from  'react-common-admin'
import 'react-common-admin/src/style.css';
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
onShowDocumentModal|function| Function that be call when DocumentModal state is changed
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
parseDataBeforePost|function| optional - function that call with the data before post, (data) => {return ({...data, {test: 1})}
saveOnBlur|boollean| default is true, run react-parse put when input is blur
messages| object| You can display a custom message, this data will pass to your notification service, see  initCommonAdmin
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
tableProps|object| see collention tableProps
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

### collention tableProps
-----
| key | type | Description|
|-----|--|--|
|renderAddBtn|function|funciton that get all table props and need to return a button|
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
tableProps: {
renderAddBtn: this.renderSelectTypeToAdd
}
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
