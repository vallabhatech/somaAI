import { Link } from "react-router-dom";

export default function LessonCard({name, id, content}) {
    const maxLength = 200;

    return (
        <Link
            to={`/lesson/${id}`}
            className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-emerald-100 hover:scale-[1.03] transition-all duration-300"
        >
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-slate-700 text-sm">{content.length > maxLength - 3 ? content.slice(0, maxLength - 3) + '...' : content}</p>
        </Link>
    );
}