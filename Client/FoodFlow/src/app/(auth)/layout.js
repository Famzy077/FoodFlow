import AuthCoverImage from "@/components/auth/AuthCoverImage";

export default function RootLayout({ children }) {
    return (
          <div className="w-full flex">
            <div className="w-1/2 h-screen max-md:hidden max-sm:hidden">
                <AuthCoverImage/> 
            </div>

            <div className="w-1/2 max-md:w-full max-sm:w-full max-sm:px-10 px-20 py-10 flex flex-col gap-8 overflow-y-scroll scrollbar-none">
                {children}
            </div>

          </div>
    );
  }