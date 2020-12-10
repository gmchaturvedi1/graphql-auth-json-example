// //check verification of user authenticated  in resolver
const {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType
} = require('graphql-parse-resolve-info')

const { AuthenticationError } = require('apollo-server-core')
// Role Wise Authentication
const requiresRole = role => resolver => {
  return (parent, args, context, info) => {
    if (context.authUser && (!role || context.authUser.role === role)) {
      return resolver(parent, args, context, info)
    } else {
      throw new AuthenticationError('Unauthorized')
    }
  }
}
export const membersOnly = requiresRole('MEMBER')
export const adminsOnly = requiresRole('ADMIN')
export const requiresLogin = requiresRole(null)

export const requestedFields = (info) => {
  const parsedResolveInfoFragment = parseResolveInfo(info)
  const { fields } = simplifyParsedResolveInfoFragmentWithType(
    parsedResolveInfoFragment,
    info.returnType
  )

  const required = {}
  Object.entries(fields).forEach(([key, value]) => {
    if (Object.keys(value.fieldsByTypeName).length === 0) {
      required[key] = 1
    }
  })

  return required
}

export const selectedFields = (d) => {
  let fields = ''
  for (const e of d.fieldNodes[0].selectionSet.selections) {
    //    console.log(e.name.value)
    // if (e.name.value === 'id') {
    //   fields._id = 1
    // }
    if (e.name.value !== 'id' || e.name.value != 'result') {
      //    fields[e.name.value] = 1
      fields = fields.concat(' ' + e.name.value)
    }
  }
  // console.log(fields)
  return fields
}

export const mapAttributes = (model, { fieldNodes }) => {
  // get the fields of the Model (columns of the table)
  const columns = new Set(Object.keys(model.rawAttributes))
  const requested_attributes = fieldNodes[0].selectionSet.selections
    .map(({ name: { value } }) => value)
  // filter the attributes against the columns
  return requested_attributes.filter(attribute => columns.has(attribute))
}
