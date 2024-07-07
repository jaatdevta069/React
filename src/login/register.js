import InputFields from "./inputFields";
import { useForm } from "react-hook-form";
import { formRegister } from "./formregister";

function RegisterBlock(props) {
  props.setpathname(window.location.pathname);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passWatch = watch('password');
  const submitdata = (data,e) => {
    props.log(e,data.userName, data.password, data.name, data.mail);
    console.log(data);
  };

  return (
    <div className="loginBlock">
      <form onSubmit={handleSubmit(submitdata)} className="loginform">
        <div className="flex start"><div>
        <InputFields
          label={"Name"}
          placeholder={"name"}
          type={"text"}
          name={"name"}
          register={{
            ...register(
              "name",
              formRegister('Name is required')
            ),
          }}
          showAlert={errors?.name}
          messgae={errors?.name?.message}
          htmlFor={"name"}
        />
        <InputFields
          label={"Username"}
          placeholder={"Username"}
          type={"text"}
          name={"userName"}
          register={{
            ...register(
              "userName",
              formRegister('Username is required')
            ),
          }}
          showAlert={errors?.userName}
          messgae={errors?.userName?.message}
          htmlFor={"userName"}
        />
       
        <InputFields
          label={"Confirm Password"}
          placeholder={"Confirm Password"}
          type={"text"}
          name={"cnfpassword"}
          register={{
            ...register(
              "cnfpassword",
              {...formRegister('Confirm password is required'),validate:(value,values)=>{
                if(values.password !== value) return 'Password is not matching.'
              },
              disabled: !passWatch
            }
            ),
          }}
          showAlert={errors?.cnfpassword}
          messgae={errors?.cnfpassword?.message}
          htmlFor={"cnfpassword"}
        /></div>
        <div>
        <InputFields
          label={"Email"}
          placeholder={"Email"}
          type={"text"}
          name={"mail"}
          register={{
            ...register(
              "mail",
              formRegister('Email is required')
            ),
          }}
          showAlert={errors?.mail}
          messgae={errors?.mail?.message}
          htmlFor={"mail"}
        />
         <InputFields
          label={"Password"}
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          register={{
            ...register(
              "password",
              formRegister('Password is required',null,null,null,null,8,'Enter minimum of 8 characters.')
            ),
          }}
          showAlert={errors?.password}
          messgae={errors?.password?.message}
          htmlFor={"password"}
        />
        </div></div>
        <input className="hide" type="submit" />
      </form>
      <div className="flexColumn loginbut">
        <button className="loginButton" onClick={handleSubmit(submitdata)} disabled={props.disabled}>
          Sign Up
        </button>
        <span className="registerlink">
          Already a user? <a href="/auth">click here to Login</a>
        </span>
      </div>
    </div>
  );
}

export default RegisterBlock;
