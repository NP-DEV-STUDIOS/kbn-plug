import HrInfiniteScrollable from "../../app/(public-pages)/jobs/_components/hr-infinite-scrollable";
import {jobCategories} from "@/app/(public-pages)/jobs/lib/categories";



const CategoriesSection = () => {
    return (
        <div className="bg-white">
            <HrInfiniteScrollable categories={jobCategories} />
        </div>
    )
}

export default CategoriesSection