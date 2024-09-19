

export const NavBar = () =>{
  return (
    <>
       <div className='navbar bg-base-100'>
                <div className='flex-1'>
                    <a className='btn btn-ghost text-xl'>SweatSmart</a>
                </div>
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1'>
                        <li>
                            <details>
                                <summary>
                                    Account
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='lucide lucide-user h-5 w-5'
                                        data-id='8'
                                    >
                                        <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                                        <circle cx='12' cy='7' r='4'></circle>
                                    </svg>
                                </summary>
                                <ul className='bg-base-100 rounded-t-none p-2'>
                                    <li>
                                        <a
                                            onClick={() => {
                                                localStorage.clear();
                                                window.location.href = '/';
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
    </>
  );
}