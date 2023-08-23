import { IsNotEmpty, IsStrongPassword, IsEmail, IsMobilePhone, Length } from "class-validator";
import { IsNotInUsed } from "src/utils/validators/IsNotInUsed";

export class RegisterUser {
    @IsNotEmpty()
    @IsNotInUsed()
    username: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
  
    @IsNotEmpty()
    @IsEmail()
    @IsNotInUsed()
    email: string;
  
    @IsNotEmpty()
    @IsMobilePhone('th-TH')
    mobile_no: string;
  
    @IsNotEmpty()
    @Length(13, 13)
    @IsNotInUsed()
    nat_id: string;
  }
  