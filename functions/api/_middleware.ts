import { devLogger } from '~functions/utilities'

const errorHandler: PagesFunction = async context => {
  try {
    return await context.next()
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : `Encoutered an error: ` + JSON.stringify(error, null, 2)
    devLogger(['middleware log', errorMessage])
    return new Response(errorMessage, { status: 500 })
  }
}

export const onRequest = [errorHandler]
