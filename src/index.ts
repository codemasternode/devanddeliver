import loader from './loaders'
import config from './config'

const { node: { PORT } } = config

loader().then((app) => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log("Application is fully loaded")
    })
})