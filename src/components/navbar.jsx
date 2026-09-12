import { useState } from "react"

// ====================================
// TAILWIND CRASH COURSE (via navbar)
// ====================================

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'piercing', label: 'Piercing' },
    { id: 'tattoos', label: 'Tattoos' },
    { id: 'beauty', label: 'Beauty' }
]

export default function Navbar() {

    const [activeTab, setActiveTab] = useState('home')

    return (
        <>
            <div className='container-fluid navbar-container'>

                {/* 
        FLEXBOX
        inline-flex   => display: inline-flex
        justify-start => justify-content: flex-start
        items-start   =>  flex-start
        gap-12        => gap: 3rem (time for the real reason i made a flexbox section, ✨Tailwind spacing scale✨, each step = 0.25rem), so gap-12 = 12 * 0.25rem = 3rem O_O)*/}
                <div className='navbar-buttons inline-flex justify-start items-start gap-12'>
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id

                        return (
                            <button
                                key={items.id}
                                onClick={() => setActiveTab(items.id)}

                                //i'd like to give a very special screw you to my group mate for making me have to learn tailwind, rip stylesheet.css T-T
                                // --------TAILWIND CSS --------
                                // psudo-element - after:content-[''], after:absolute, is Tailwind's bastardised syntax for targeting ::after. anything you'd write after ::after{} in css gets an after: prefix :D

                                /* FONT IMPORT 
                                font-['Playfair_Display'] is Tailwind's "arbitrary value" syntax 
                                square brackets let you drop in a value Tailwind doesn't have a preset name for. 
                                BUT this only works if the browser already knows what "Playfair_Display" is. Tailwind doesn't magically fetch fonts. */

                                /* TAILWIND FONT SIZE UTILITY
                                text-2xl is Tailwind's font-size utility scale, shorthand for a preset font-size + line-height pair.
                                text-xs    -> 0.75rem
                                text-sm    -> 0.875rem
                                text-base  -> 1rem     (tdefault/normal size)
                                text-lg    -> 1.125rem
                                text-xl    -> 1.25rem
                                text-2xl   -> 1.5rem
                                text-3xl   -> 1.875rem
                                text-4xl   -> 2.25rem
                                ...and it keeps climbing (5xl, 6xl, etc.)
                                
                                want a different exact size Tailwind doesn't have a preset for? do the arbitrary value thing text-[1.4rem]
                                */

                                /* GRADIENT
                                after:bg-gradient-to-r sets the direction (left to right).
                                from-/via-/to- define the color stops, same idea as 
                                linear-gradient(to right, colorA, colorB, colorC) in CSS. 
                                after:bg-gradient-to-r 
                                after:from-[#AD7E4F] 
                                after:via-[#DCB993] 
                                after:to-[#AD7E4F] */

                                /* ANIMATION
                                    we're not animating the underline's opacity or position, 
                                    it animating its WIDTH — it grows from 0 to full/40% 
                                    on hover or active. 
                                    transition-[width] tells Tailwind specifically "animate the width property when it changes", 
                                    duration-300 = 300ms, 
                                    ease-in-out = the easing curve.

                                    after:transition-[width] 
                                    after:duration-300 
                                    after:ease-in-out*/
                                className={`

                                    
                                relative
                                justify-start bg-none border-none pb-3
                                text-2xl font-normal 
                                font-['Playfair_Display] pb-3 
                                transition-colors duration-300 ease-in-out 

                                after:content-[''] 
                                after:absolute 
                                after:bottom-0 
                                after:left-1/2
                                after:-translate-x-1/2 
                                after:h-[2px] 
                                after:rounded-full

                                after:bg-gradient-to-r 
                                after:from-[#AD7E4F] 
                                after:via-[#DCB993] 
                                after:to-[#AD7E4F]

                                after:transition-[width]
                                after:duration-300 
                                after:ease-in-out

                                ${isActive
                                        ? "text-[#DCB993] [text-shadow:0_0_8px_rgba(255,255,255,0.5)] after:w-full"
                                        : "text-[#DCB993] hover:text-[#AD7E4F] hover:after:w-full after:w-0"
                                    }
        `}
                            >
                                {items.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


