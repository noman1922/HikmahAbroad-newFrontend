import React from 'react';

const Stats: React.FC = () => {
    const logos = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9OCPMpWIBcEVnkzG721qaNEJeuBbAYQ9tgv-xbUax5Hlc8dkpAsk7fa2-_ciUKxDA_8KYhZfNtxbJMYayZijpZdUvWTlbM7i2N2Smkg686Zjhk9epbMpGWleifbW0ajBMp-KJtnayepj-_MaFwqLsscw9_cX9kLrvmhmblb6vQqEzKqalzQgrIr3glIzW6Qo5D49zDk70e6JoFh-btYBzflI2C-WF9BHtwebvM6bm4CUIzzmSx_RC_TLMYHGccSaXR91Zd0Pj026z",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAiifrfrgR4d0XyxfgXg9hhVtFX5dif2INmGCswtAwawu8ntrzZ2rhFxcZbxCV7N-iMW7CF_AP9zb349NFuTVk9nSYMv0WRQ9k-UDfi6h3hI3ON0dcmPaFvckjf7e43InisaLvpaoTkwph99-IYWvYOIBZCL3e_t-SxIQw91HqBnQeBFIJ23z4_273Ja0pUWWwrjQHzQeT3ojP1Xg1fF-uobJetgOqkb_67Y9Qe0EombPoJ8iyOCb95AtvtTf4oRunw78GpJVt5t_HE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhx6D3zmTWBHvlfmQr4yiGBjency6GG-qXNngbbZ8leOijp9biu7LrPL--AZgsz9MlOCKkVu1NtjuwaZjCAePY-vbKNOF4d36T9iKHDAlZgm7_9XHpa9pAltHjX2jD-sVPrVIKMWnbemg7rRJvOElN9TO9aGQAWIfs8i3Lyzivr2DzohNpSPzw5BQJFzVi6awfYlr0En_NKnatyccgF3zg_dhlJIdwfgFXCpmvojLtpLnpxFzfKRQXdiRz6MQvcRPX2z8lvpfpw_YK",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCDJcRdCpmV_qkPJUiqvpxNz1G1vkwDZRwKW-1iy1LD_C-uGZ4KfuBdViRFc2vIuUa7Y_nPYyM2hf8xvW9KXN9DvEx331gJ9AUTKMesQgaLDp749Cn6UZxqyPPc-da_hwiIGeAW2pye2RaLdDuW7zempoKvoIcyaLr_vLi0gFkpL2f7i1n9b0BjUUhvwtKX8h9MzyaQdmCxfFsxB71TPuZG5sRM4OThL165zoAwrX9JvRC_DEQ6MrlAdfyeLbGcklOLUttv3fHTHVGk",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGEzuo6_mPpagAOAZbzHMvkCBVUAZpGFps56LMYKrigu_2Hhdo1wyhFsOrJ0066PyRFyBuiqq-MtSdRGZZuYUfU8pPCxGcCBMA_Lnzkf-R8036pZeKaH5cKvRQ5sr3PYqnrp-hcLFybvsBI8yPKYY6JOiMXKnP6UQEF_O1Sa6rn5cxspxXksrw0K3ihyUSkAPx4HPAe0C-ffO7Jv_ymG5hNyw6ugv4AfXoOB5cAAsOI4Ygk7q8A3LjV-6lunSx0topf6QN_I9zjcPR",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Qc_rFc7Zm_-vNpxA8vaIdiiPAPHxjDu-nvKziE889vIWvxw-nM8nYWgLUYCZZ32U9R_f00_cro_6-mopTmjS7J1Po5wEBTvmGlaCd-rkGi1lOFJ39ArruaJIWgU75FNitEJCWhJTyp-4pKmti7FpZ5Ky-kQkVwdpO4yht1iQnq68gAjLVb0-vY9G3Mi3KnF-QDp-QYj15j90BQo9HSz_-jO57Q_XFtPpqFeOqBqPuX-M0Kn4KFCaqENaRy0UNpr2-8axFPgTMFvp",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCuMGb1yf11Fe5xh7V8odt6WApXDpmYKir6iYFz3rBEoeJtoaH4JMQ2DrKkc1is2yWYzlGL6F7Xn1nLb5BMGh3fY_6q-rmPH6Vn4stL5hNczx2pnMWG2-bmy42Fi6LUdMXrMp4zXqPAhfGdXg9uX0E6S5KlmB-UKa2dQ7FwU3qxkokJAGOtbAnK8HD9xJe0l2wTYANEiFSvj0h2ng3iaVrdAsvFCGxt9ZSHx6vQIjL3bo9ILUX78vcKgyQnDucusR85mEMkBQh9xKOP",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAMrAn5G8kftFMIsIGsmjPJIgixFY1Z5PCDhuxtVSFIKJ0cVsneRDAKAWJeG76A0tYGPSxsKsc_VWh5jI3_LTat2v-rD5CmqeuxWDow7ut1eimp8Vkx2erVQeMX7ED4PFOaGq_dlJG9KTdvHaBF9fhwoxZAaFt9ULJqbqMODjlPYoTtT6JFlwpYwLnfuhaT-sHnOuHLwLMGS7p-haIX3juJHZiZJxal_XSjL-eN9GDrfsIbcwUmWac-29OO_3Ieeu8mo8yHEU0wqmR",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA1BWSF1h_VcXxg0JWCV4k3eSi8ducvyMrmKD1QE5eBdZgL4ROX0K_Oe1DqAFrJEdEdjJUHMDPPQfdYd1IHOkLPga5fWOhUwo7X-6sz9NEPITnmGUcIYmvfQNI95XFEHN-dSqLfUPLqf-rczzPR1194rYDhat08PZPrEzJu_gh8w2YxwEnn34RQqjmNfglaeB2a7wQpx3L2WYv046k3Ql9GMkRthJZaCVUXWpgFtX2D1Y4tSdXgItsVQU6V-RYldhHGMFd9XGdY3nhK",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3h6Y8BUFHu9aLDuwv5H5RT7i932ImjjNCJlh_1lLFKgunxgn2SMsP4HzxGn8K3Y6biue6rWZI-WQRS--M51cmFJc-ZFvdKczU1JFtfzNfEPKkss7obwUm2bSdgsO7kh3qUifl24xUif4fD8wswtkCpdVIl2Bgxnhe7DZcs9TmIb_FrUIz9Xy_gF9nR8Fv-bT7jJbq1SzMN2V6MjKqUz3vY8UzbENkoKAFXPjOQDsuID-4NQnqqUXDopmUdjcH0_RFvI_k-Xa14DZu"
    ];

    return (
        <div className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-10">Our Prestigious Partner Universities</p>
                <div className="relative flex overflow-x-hidden">
                    <div className="animate-scroll flex items-center gap-16 min-w-full">
                        {logos.map((src, index) => (
                            <img key={index} alt="University Logo" className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" src={src} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
