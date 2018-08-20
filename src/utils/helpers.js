import validateJs from 'validate.js';
import find from 'lodash/find'

export const buildQuery = function ({ searchText, fields }) {
  const text = searchText
  let query
  if (text === '') {
    query = {}
  } else {
    const _searchFields = fields.filter(field => field.search)
    if (_searchFields) {
      query = {
        $or: _searchFields.map(field => {
          switch (field.key) {
            // case 'productId':
            //   return {
            //     'productId': {
            //       $exists: true,
            //       '$inQuery': {
            //         'where': { 'name': { '$regex': text, $options: 'i' } }, 'className': 'Product'
            //       }
            //     }
            //   }
            // case 'memberId': {
            //   const splitText = text.split(' ')
            //   let where = {}
            //   if (splitText.length === 2) {
            //     where = { $and: [{ 'firstName': { '$regex': splitText[0], $options: 'i' } }, { 'lastName': { '$regex': splitText[1], $options: 'i' } }] }
            //   } else {
            //     // where = {
            //     //   $or: [{ 'firstName': { '$regex': text, $options: 'i' } },
            //     //   { 'lastName': { '$regex': text, $options: 'i' } },
            //     //   {
            //     //     'tier': {
            //     //       '$inQuery': { 'where': { 'name': { '$regex': text, $options: 'i' } }, 'className': 'Tier' }
            //     //     }
            //     //   }]
            //     // }
            //   }
            //   return {
            //     'memberId': {
            //       '$inQuery': {
            //         'where': where, 'className': 'Member'
            //       }
            //     }
            //   }
            // }
            default:
              return { [field.key]: { '$regex': text, $options: 'i' } }
          }
        })
          .filter(o => o)
      }
    } else {
      query = {}
    }
  }
  return query
}

export const getFieldValue = function (field, documentData = {}) {
  const formatter = field.formatter
  const fieldValue = documentData[field.key]
  let value = formatter ? formatter(fieldValue) : fieldValue
  return value;
}
export const getFieldValidatorMessage = function (field, value) {
  const { validators } = field
  let message = null
  if (validators) {
    message = validateJs.single(value, validators)
  }
  return message && message[0]
}
export const selectOptionsFromExtraData = function (field, extraData = {}) {
  debugger
  if(field.type === 'pointer') {
    return extraData[field.pointerTo]
  }
}

export const findValueInOption = function(value, options) {
  if(typeof value === 'object' && options) {
    let option = find(options, function(o) { return o.objectId === value.objectId; }) || {};
    const newValue = {...value, ...option}
    return newValue;
  }
  return value
};

/**
 * createPointer- return pointer
 */
export const createPointer = function (schemaName, objectId) {
  return {
    className: schemaName,
    objectId: objectId,
    __type: 'Pointer',
  };
};
