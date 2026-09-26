import {Link} from 'react-router-dom'
import Swal from "sweetalert2";

const SecuritySettings = () => {
  return (
    <>
      <section
        className="settings-card bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
        id="security"
      >
        <div className="bg-surface-container px-6 py-4 border-b border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Security
          </h2>
        </div>
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-outline-variant/30 rounded-lg bg-surface">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon="key">
                  key
                </span>
              </div>
              <div>
                <h3 className="font-label-lg text-on-surface">
                  Change Password
                </h3>
                {/*<p className="text-label-md text-on-surface-variant">*/}
                {/*  Last changed 3 months ago.*/}
                {/*</p>*/}
              </div>
            </div>
            <Link to={'../changepassword'} className="border border-primary text-primary px-6 py-2 rounded-full font-label-lg hover:bg-primary/5 transition-colors">
              Update Password
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-outline-variant/30 rounded-lg bg-surface">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  data-icon="verified_user"
                >
                  verified_user
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-label-lg text-on-surface">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <span className="material-symbols-outlined text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-bold" data-icon="upcoming">
                    upcoming
                  </span>
                </div>
                <p className="text-label-md text-on-surface-variant">
                  Protect your account with an extra layer of security.
                </p>
              </div>
            </div>
            <button type={'button'} className="text-on-surface-variant font-label-lg hover:text-primary underline transition-colors" onClick={() => Swal.fire({
              title: 'Coming Soon!',
              text: 'This feature is coming soon. Please check back later.',
              icon: 'info',
            })}>
              Manage 2FA
            </button>
          </div>


        </div>
      </section>

      <section className="settings-card bg-error-container/20 border border-error/20 rounded-xl overflow-hidden">
        <div className="bg-error-container/40 px-6 py-4 border-b border-error/20">
          <h2 className="font-headline-md text-headline-md text-error">
            Danger Zone
          </h2>
        </div>
        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-label-lg text-on-error-container">
              Deactivate Account
            </h3>
            <p className="text-label-md text-on-error-container/80">
              Permanently remove your digital access to the voter portal. This
              does not affect your PVC registration.
            </p>
          </div>
          <button className="bg-error text-on-error px-6 py-2 rounded-full font-label-lg hover:opacity-90 active:scale-95 transition-all shadow-md" onClick={() => Swal.fire({
            title: 'Coming Soon!',
            text: 'This feature is coming soon. Please check back later.',
            icon: 'info',
          })}>
            Deactivate Account
          </button>
        </div>
      </section>
    </>
  );
};

export default SecuritySettings;
