import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { log } from 'node:console'

type Env = {
    Variables: {
        user: KindeUser<Record<string, any>>
    }
}
export const getAuthUser = createMiddleware<Env>(async (c, next) => {
    try {
        console.log("hello world");
        
        const { getUser } = getKindeServerSession();
        const user=await getUser();
        
        c.set("user",user)
        await next()
    } catch (error) {
        console.log(error)
        throw new HTTPException(401,{
            res:c.json({error:'Unauthorized in catch'})
        })
    }
})