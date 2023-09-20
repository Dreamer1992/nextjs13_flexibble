import { User, Session } from 'next-auth'

export interface IFormState {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
}

interface ICreatedBy {
    name: string
    email: string
    avatarUrl: string
    id: string
}

export interface IProjectInterface {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
    id: string
    createdBy: ICreatedBy
}

interface IProjects {
    edges: { node: IProjectInterface }[]
    pageInfo: {
        hasPreviousPage: boolean
        hasNextPage: boolean
        startCursor: string
        endCursor: string
    }
}

export interface IUserProfile {
    id: string
    name: string
    email: string
    description: string | null
    avatarUrl: string
    githubUrl: string | null
    linkedinUrl: string | null
    projects: IProjects
}

export interface SessionInterface extends Session {
    user: User & {
        id: string
        name: string
        email: string
        avatarUrl: string
    }
}

export interface IProjectForm {
    title: string
    description: string
    image: string
    liveSiteUrl: string
    githubUrl: string
    category: string
}
