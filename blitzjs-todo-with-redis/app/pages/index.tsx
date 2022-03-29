import { Link, BlitzPage, useMutation, Routes, getAntiCSRFToken } from "blitz"
import { useRef, useEffect, useState, Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

const Main = () => {
  const todoRef = useRef<HTMLInputElement>(null)
  const [todos, setTodos] = useState([])
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const handleAddTodo = async (e) => {
    e.preventDefault()
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ data: todoRef.current?.value }),
    })
    const data = await response.json()
    if (data.success) {
      todoRef.current!.value = ""
      fetchTodos()
    }
  }
  const handleRemoveTodo = async (id) => {
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ data: id }),
    })
    const data = await response.json()
    if (data.success) {
      fetchTodos()
    }
  }
  const fetchTodos = async () => {
    const antiCSRFToken = await getAntiCSRFToken()
    const response = await fetch("/api/getall", {
      method: "GET",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
    })
    const res = await response.json()
    setTodos(res.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  if (currentUser) {
    return (
      <>
        <button
          className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400 mb-3"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User email: <code>{currentUser.email}</code>
        </div>
        <form className="mt-2" onSubmit={handleAddTodo}>
          <p>add a todo:</p>
          <input
            ref={todoRef}
            className="w-full border-black border-2 focus:outline-none text-center"
          />
        </form>
        <div className="flex flex-col gap-2 mt-4 bg-gray-300 rounded-md">
          {(todos as string[]).map((todo: string, index: number) => (
            <div className="flex items-center p-3 rounded-md bg-gray-300" key={index}>
              <button
                onClick={() => handleRemoveTodo(todo)}
                className="flex items-center mr-4 justify-center w-5 h-5 rounded-[0.25rem] border border-solid border-gray-500 shadow-sm hover:bg-gray-700"
              ></button>

              <span>{todo}</span>
            </div>
          ))}
        </div>
      </>
    )
  } else {
    return (
      <div className="flex flex-col gap-4 text-center">
        <Link href={Routes.SignupPage()}>
          <a className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="mt-4 px-2 py-1 border-2 border-black hover:bg-gray-400">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main>
        <div className="my-4">
          <Suspense fallback="Loading...">
            <Main />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
