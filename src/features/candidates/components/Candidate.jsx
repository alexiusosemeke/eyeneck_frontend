import {useNavigate} from 'react-router-dom'

export const Candidate = ({candidate}) => {

    const navigate = useNavigate();

    const {id, name, party, party_initials, image, description} = candidate;

  return (
    <>
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group">
      {/* Top Row: Avatar & Metadata */}
      <div className="flex items-start gap-4">
        <img
          src={image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border border-outline-variant shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="min-w-0 flex-1">
          <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-wider border border-outline-variant inline-block mb-1">
            {party_initials || "Candidate"}
          </span>
          <h3 className="font-bold text-on-surface text-base truncate capitalize">
            {name}
          </h3>
          <p className="text-xs text-primary font-medium truncate mt-0.5">
            {party || "Independent"}
          </p>
        </div>
      </div>

        {/* Description */}
        <p className="text-sm text-on-surface-variant line-clamp-3">
            {description || "No description available for this candidate."}
        </p>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => navigate(`/candidates/${id}`)}
        className="w-full py-2.5 px-4 rounded-xl border border-outline-variant bg-surface text-on-surface text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary hover:border-primary transition-all cursor-pointer"
      >
        <span>View Profile & Manifestos</span>
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
        </>
  )
}
