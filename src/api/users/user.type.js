const type = `
scalar Date
type User{
    id: ID
    createdAt:Date
    email:String
    firstName: String
    lastName:String
    role: String
    password:String
}
type tokenResponse{
    userId:ID
    token:String
    createdAt:Date
}

type userResponse{
    user:User
    token:String
}



 


type Query {
    user:User
    userById(id:ID):User
    userByEmailId(email:String):User
 }

type Mutation {
  createUser(email:String,firstName:String,lastName:String,mobileNumber:String,password:String,url:String,userGroup:String):User
  removeUser(id:ID!):User
  login(email:String,password:String):userResponse
  updateUser(id:ID,email:String,firstName:String,lastName:String,mobileNumber:String,password:String,userGroup:String):User
 }


`

export default type
