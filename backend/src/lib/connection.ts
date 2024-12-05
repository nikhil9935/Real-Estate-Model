import mongoose from 'mongoose'
class Connection {
    private static url: string = 'mongodb://localhost:27017/mernrealestate';
    public static connectDB = async () => {
        try {
            await mongoose.connect(this.url);
            console.log("Connected")
        }
        catch (error) {
            console.log(error)
        }
    }
}
export default Connection