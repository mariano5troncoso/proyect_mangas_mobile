import { createBrowserRouter } from "react-router-dom";
import Register from '../pages/Register'
import Main from "../layouts/Main";
import SignIn from '../pages/Signin'
import Index from "../pages/Index";
import Welcome from "../pages/NotAllow"
import { ProtectedRoute, ProtectedSignIn, ProtectedRouteMangaDetail, ProtectedRouteMangas} from "./ProtectedRoute"
import FormManga from "../pages/Manga-Form";
import Mangas from "../pages/Mangas";
import MangaDetail from "../pages/MangaDetail";
import VerifyCode from "../components/verifyCode";



const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element: <Index/>
            },
            {
                path:'/mangas',
                element: (
                    <ProtectedRouteMangas>
                    <Mangas />
                    </ProtectedRouteMangas> 
                )
            },
            {
                path:'/manga/:id',
                element: (
                    <ProtectedRouteMangaDetail>
                    <MangaDetail />
                    </ProtectedRouteMangaDetail>
                )
            },
            {
                path:'/NotAllow',
                element: <Welcome />
            },
            {
                path:'/signin',
                element: (
                    <ProtectedSignIn>
                    <SignIn />
                    </ProtectedSignIn>
                )
            },
            {
                path:'/register',
                element: (
                    <ProtectedRoute>
                    <Register />
                    </ProtectedRoute>
                )
            },
            {
                path:'/verifyAccount',
                element: (
                    <VerifyCode />
                )
            },
            {
                path: "/manga-form",
                element: <FormManga />,
            }
        ]
    }
])

export default router