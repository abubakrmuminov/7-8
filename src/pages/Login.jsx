import { Form, NavLink, useActionData } from "react-router-dom";
import useLogin from "../hook/useLogin";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { FcGoogle } from "react-icons/fc";
import { FaAngleDoubleRight, FaGithub } from "react-icons/fa";
import { useResetPassword } from "../hook/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  return data

}



export default function Login() {
  const data = useActionData()
  const { login, isPending } = useLogin()
  const { resetPassword } = useResetPassword()
  const [form, setform] = useState(false)


  useEffect(() => {
    if (data?.email && data?.password) {
      login(data.email, data.password);
    } else {
      data ? formError() : false
    }

    if (data?.emailRecovery) {
      resetPassword(data.emailRecovery)
    }

  }, [data])

  return (
    <div className="login">
      {!form && <Form method="post" className="form">
        <p>
          Welcome,<span>Login in to continue</span>
          <NavLink to={"/register"}>Register</NavLink>
        </p>



        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <div className="separator">
          <div></div>
          <span>OR</span>
          <div></div>
        </div>
        {!form && <button className="oauthButton" onClick={() => setform(!form)}>
          Forget password
        </button>}
        <button className="oauthButton">
          <FcGoogle size={24} />
          Continue with Google
        </button>
        <button className="oauthButton">
          <FaGithub size={24} />
          Continue with Github
        </button>
        {!isPending && <button className="oauthButton">
          Continue
          <FaAngleDoubleRight size={18} />
        </button>}
        {isPending && <button className="oauthButton">
          Loading...
        </button>}
      </Form>}

      {form && <Form method="post" className="form">
        <p>
          Welcome,<span>Login in to continue</span>
        </p>

        <input type="email" placeholder="Email" name="emailRecovery" />
        <button className="oauthButton">
          Sent
        </button>
        {form && <button className="oauthButton" onClick={() => setform(!form)}>
          Show login
        </button>}
      </Form>
      }
    </div>
  )
}
