import './App.css'
import DeveloperForm from './features/developers/components/DeveloperForm'
import { NavLink, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DevelopersListPage from './features/developers/pages/DevelopersListPage'
import ProjectsListPage from './features/projects/pages/ProjectsListPage'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './components/ui/navigation-menu'
import DeveloperDetailsPage from './features/developers/pages/DeveloperDetailsPage'
import DeveloperAssignmentsList from './features/developers/components/DeveloperAssignmentsList'
import DeveloperEditForm from './features/developers/components/DeveloperEditForm'
import ProjectForm from './features/projects/components/ProjectForm'
import ProjectDetailsPage from './features/projects/pages/ProjectDetailsPage'
import ProjectManagementList from './features/projects/components/ProjectManagementList'
import HomePage from './pages/Home'

function App() {

  return (
    <>
      <header>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/">Home</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/desarrolladores">Desarrolladores</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <NavLink to="/proyectos">Proyectos</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/' element={<HomePage/>} />
          <Route path='/desarrolladores' element={<DevelopersListPage/>} />
          <Route path='/desarrolladores/crear' element={<DeveloperForm/>} />
          <Route path='/desarrolladores/:id' element={<DeveloperDetailsPage/>} />
          <Route path='/desarrolladores/:id/editar' element={<DeveloperEditForm/>} />
          <Route path='/desarrolladores/:id/asignar-proyecto' element={<DeveloperAssignmentsList/>}/>

          <Route path='/proyectos' element={<ProjectsListPage/>} />
          <Route path='/proyectos/crear' element={<ProjectForm/>} />
          <Route path='/proyectos/:id' element={<ProjectDetailsPage/>} />
          <Route path='/proyectos/:id/editar' element={<>No Implementado</>} />
          <Route path='/proyectos/:id/asignar-desarrollador' element={<ProjectManagementList/>} />

          <Route path='*' element={<h1>Página no exitste</h1>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
