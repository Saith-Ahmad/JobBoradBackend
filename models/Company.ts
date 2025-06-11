import mongoose, { Schema, Document } from 'mongoose';
import Job from './Job';
import Applicant from './Applicant';

interface ICompany extends Document {
    name: string;
    image?: string;
    description: string;
}

const CompanySchema = new Schema<ICompany>({
    name: { type: String, required: true, trim: true, unique: true },
    image: {
        type: String,
        required: false,
        default: 'https://source.unsplash.com/featured/?company,office'
    },
    description: { type: String, required: true, trim: true },
}, { timestamps: true });


CompanySchema.pre('findOneAndDelete', async function (next) {
    const companyId = this.getQuery()['_id'];
    try {
        // Find all jobs associated with this company
        const jobs = await Job.find({ company: companyId });
        // Extract job IDs
        const jobIds = jobs.map((job) => job._id);
        // Delete all applicants linked to these jobs
        await Applicant.deleteMany({ job: { $in: jobIds } });
        // Delete all jobs linked to this company
        await Job.deleteMany({ company: companyId });

        next();
    } catch (error: any) {
        next(error);
    }
});



const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
export default Company;


