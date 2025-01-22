import UserForm from "@/components/UserForm";
import { defineType } from "sanity";

export default defineType({
  name: "usersType",
  type: "document",
  title:'User',
  fields: [
    {
      name: "userForm",
      type: "object",
      title: "User Details",
      fields:[
        {
          name:'full_name',
          type:'string'
        },
        {
          name:'email',
          type:'string'
        },
        {
          name:'role',
          type:'string'
        },
        
      ],
      components: {
        input: UserForm,
      },
    },
  ],
  preview:{
    prepare:()=>{
      return ({title:'Send Invitation'})
    }
  }
});
