
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

/**
 * @function syncChangedWithOtherField
 * use it inside fieldConfig like that:
  {
    key: 'name',
    label: 'Name',
    validators: { presence: true, length: { minimum: 2 } },
    component: fields.TextInput,
    onChanged: (field, props) => {
      const _field = {...field}
      _field.value = startCase(_field.value)
      util.syncChangedWithOtherField(_field, props, 'label')
    },
  },
  {
    key: 'label',
    label: 'Label',
    validators: { presence: true, length: { minimum: 2 } },
    component: fields.TextInput,
  },
 */
export const syncChangedWithOtherField = function (field, props, otherFieldKey, onlyWhenEmpty = true) {
  const otherFieldProps = props.getOtherFieldRefByKey(otherFieldKey).parent.props; // otherFieldProps came from react-cross-form
  const otherFieldKeyValue = otherFieldProps.value
  if(!onlyWhenEmpty || (!otherFieldKeyValue || otherFieldKeyValue === '')) {
    otherFieldProps.onChangeAndBlur(field.value)
  }
};

/**
 * @function validatorsAndIsUnique
 * use it inside fieldConfig like that:
  {
    key: 'code',
    label: 'Code',
    // validators: { presence: true, length: { minimum: 3 } },
    customValidation: function (field, value, data, formProps) {
      const validators = { presence: true, length: { minimum: 3 } };
      return util.validatorsAndIsUnique(validators, 'code', field, value, data, formProps)
    },
    component: TextInput
  },
 */
export const validatorsAndIsUnique = function (validators, keyToCheck, field, value, data, formProps) {
  const collectionData = formProps.resProps.collectionData || []
  let errors = []
  if(!value || value === '') {
    errors = validateJs.single(value, validators)
  } else{
    const docWithTheSameValue = collectionData.find(item => (item[keyToCheck] === value && item.objectId !== data.objectId))
    if(docWithTheSameValue) {
      errors.push('The value is already used by other option')
    }else{
      errors = validateJs.single(value, validators)
    }
  }
  return errors
};


