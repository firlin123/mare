const content = [
    {
        type: 'section',
        content: [
            'Prefered booru?',
            {
                type: 'booruswitcher',
                boorus: [
                    { name: 'Derpibooru', id: 'derpi', url: 'https://derpibooru.org/images/', icon: 'https://firlin123.github.io/img/ss/boorus/derpi.svg' },
                    { name: 'Ponerpics', id: 'poner', url: 'https://ponerpics.org/images/', icon: 'https://firlin123.github.io/img/ss/boorus/poner.svg' },
                    { name: 'Twibooru', id: 'twi', url: 'https://twibooru.org/', icon: 'https://firlin123.github.io/img/ss/boorus/twi.svg' },
                    { name: 'Ponybooru', id: 'pony', url: 'https://ponybooru.org/images/', icon: 'https://firlin123.github.io/img/ss/boorus/pony.svg' }
                ]
            }
        ],
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>Waifu:'] },
            '>Roseluck by dariarchangel\n',
            'Cut out the background and erased the artist signature.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%203460358%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%203460358.jpg', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3460358, poner: 7074882, twi: 3356411, pony: 3695211 }, content: ['source'] },
            { type: 'hr' },
            '>Roseluck by Sugar Morning\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%202128231.png' },
            { type: 'boorulink', ids: { derpi: 2128231, poner: 2128231, twi: 1703598, pony: 73316 }, content: ['source'] },
            { type: 'hr' },
            '>Roseluck by CyanLightning\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%202070354.png' },
            { type: 'boorulink', ids: { derpi: 2070354, poner: 2070354, twi: 1656537, pony: 51652 }, content: ['source'] },
            { type: 'hr' },
            '>Roseluck by arifproject\n',
            '"Uncropped" it by editing in the rest of the legs. Also removed the artist signature.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%201384789%20legs.png', content: ['The one I used'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%201384789.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 1384789, poner: 1384789, twi: 1087933, pony: 2161572 }, content: ['source'] },
            { type: 'hr' },
            '>Roseluck by ScaniAnon\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%203407961%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/waifu/roseluck%203407961.jpg', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3407961, poner: 7012706, twi: 3278837, pony: 3639540 }, content: ['source'] },
            { type: 'hr' },
            '>Roseluck Linky stare edit\n',
            'Made during one of the rewatch streams.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/waifu/rosey.png' },
            { type: 'boorulink', ids: { derpi: 3438048, poner: 7060004, twi: 3320004, pony: 3670004 }, content: ['on booru'] },
            { type: 'hr' },
            '>Roseluck :sunbeam: edit\n',
            'Made during one of the rewatch streams.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/waifu/rosebeam.png' },
            { type: 'boorulink', ids: { derpi: 3414260, poner: 7019796, twi: 3285890, pony: 3648475 }, content: ['on booru'] },
            { type: 'hr' },
            '>Roseluck "All Nut"\n',
            'Made by combining the cropped screencap of S2E06 at 16:36.288 with (edited) "All Natural" text from ',
            { type: 'link', href: 'https://youtu.be/6Js7448n6tY', content: ['BGM\'s "All Natural" music video.'] },
            '\nP.S. this and all future timestamps are for yayponies\' 1080p iTunes release of the show.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/waifu/all%20natural.png' },
            { type: 'hr' }
        ]
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>Canon:'] },
            '>Millie by IronM17\n',
            '"Uncropped" it by editing in the rest of the legs and the tail.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/millie%201378320%20legsntail.png', content: ['The one I used'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/millie%201378320.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 1378320, poner: 1378320, twi: 1082477, pony: 191093 }, content: ['source'] },
            { type: 'hr' },
            '>Lily',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/lily.png' },
            '>iykyk (oc^)',
            { type: 'hr' },
            '>Daisy UUUU\n',
            '"If I steal a flower, will that be extremely painful?"\n',
            '>"For you."\n',
            'There is an original image and you can see it in the second tab below but I didn\'t like the Daisy\'s vector they used so remade this meme with mine.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/daisy%203403598%20mine.png', content: ['Mine'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/daisy%203403598.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3403598, poner: 7007467, twi: 3273714, pony: 3632165 }, content: ['original (bad vector)'] },
            { type: 'hr' },
            '>Junebug by php193\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/junebug%203435654%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/junebug%203435654.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3435654, poner: 7044765, twi: 3326664, pony: 3671255 }, content: ['source'] },
            { type: 'hr' },
            '>Cheerilee by vivian reed\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/cheerilee%203448843%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/cheerilee%203448843.jpg', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3448843, poner: 7061713, twi: 3343297, pony: 3682988 }, content: ['source'] },
            { type: 'hr' },
            '>Play Write by peachspices\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/play%20write%20558760.png' },
            { type: 'boorulink', ids: { derpi: 558760, poner: 558760, twi: 410450, pony: 2029434 }, content: ['source'] },
            { type: 'hr' },
            '>Mayor Mare ooo\n',
            'Vectored Mare Mare oooing for (You). Source is a screencap from S7E13 at 18:41.329.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/mayoooor.png' },
            { type: 'boorulink', ids: { derpi: 3498334, poner: 7117597, twi: 3399151, pony: 3732397 }, content: ['on booru'] },
            { type: 'hr' },
            '>Vapor Trail :sunbeam:ing\n',
            'Cut out the background and extended the mane. Source is a screencap from S6E24 at 17:40.851.\n',
            { type: 'spoiler', content: ['Please don\'t look at the ear. I didn\'t notice until AFTER I\'ve sent you out the card. I\'m sorry.'] },
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/vaporbeam.png' },
            { type: 'hr' },
            '>Clear Skies cute\n',
            'Vectored Clear Skies being extremely fucking cute. Also for (You). Source is a screencap from S5E05 at 07:51.387.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/cute%20skies.png' },
            { type: 'boorulink', ids: { derpi: 3498106, poner: 7117355, twi: 3398902, pony: 3731672 }, content: ['on booru'] },
            { type: 'hr' },
            '>Colgate by aaaTheBap\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/colgate%203478093.png' },
            { type: 'boorulink', ids: { derpi: 3478093, poner: 7094970, twi: 3376522, pony: 3712546 }, content: ['source'] },
            { type: 'hr' },
            '>Meadowbrook IWTCIMM\n',
            'Vectored Mage Meadowbrook in the IWTCIRD pose for an old IWTCIRD thread (where I was also doing the IWTCI chart).',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/meadowbrook%20iwtcimm.png' },
            { type: 'hr' },
            '>Night Glider by kas92\n',
            'Tiny edit to remove the shadow but otherwise used as is.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/night%20glider%20868468%20noshadow.png', content: ['No shadow'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/night%20glider%20868468.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 868468, poner: 868468, twi: 662511, pony: 2084990 }, content: ['source'] },
            { type: 'hr' },
            '>Coloratura by jhayarr23\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/coloratura%201485904%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/coloratura%201485904.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 1485904, poner: 1485904, twi: 1983853, pony: 2343309 }, content: ['source'] },
            { type: 'hr' },
            '>Somnambula and Coloratura drinking tea by jhayarr23\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/somnambula%20coloratura%20tea%201776673.png' },
            { type: 'boorulink', ids: { derpi: 1776673, poner: 1776673, twi: 1417249, pony: 6543 }, content: ['source'] },
            { type: 'hr' },
            '>Steely Marshal by Neuro\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/steely%20marshal%202589059%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/steely%20marshal%202589059.gif', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 2589059, poner: 2589059, twi: 2341414, pony: 2822480 }, content: ['source'] },
            { type: 'hr' },
            '>Cinnamon Cinder by Jargon Scott\n',
            'Waifu2x\'d it and removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/cinnamon%20cinder%202771646%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/cinnamon%20cinder%202771646.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 2771646, poner: 2771646, twi: 2617490, pony: 3007602 }, content: ['source'] },
            { type: 'hr' },
            '>Sew \'n Sow loafing\n',
            'Vectored Sew \'n Sow loafing. 4u. Source is a screencap from S3E08 at 03:21.201.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/sewnsow%20loaf.png' },
            { type: 'boorulink', ids: { derpi: 3517234, poner: 7138851, twi: 3419286, pony: 3751196 }, content: ['on booru'] },
            { type: 'hr' },
            '>Nurse Snowheart by ispincharles\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/nurse%20snowheart%20979874.png' },
            { type: 'boorulink', ids: { derpi: 979874, poner: 979874, twi: 751346, pony: 2118093 }, content: ['source'] },
            { type: 'hr' },
            '>Copper Top wink\n',
            'Edited eyes and the mouth to make the happy wink instead of worried like in the original. Source is a screencap from S6E03 at 07:22.150.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/copper%20top%20wink%20happy.png', content: ['Happy wink'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/canon/copper%20top%20wink.png', content: ['Original'] },
                ]
            },
            { type: 'hr' },
            '>March Gustysnows by Cylosis\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/march%20gustysnows%20925865.png' },
            { type: 'boorulink', ids: { derpi: 925865, poner: 925865, twi: 2154805, pony: 2079824 }, content: ['source'] },
            { type: 'hr' },
            '>Ever Essence by cheezedoodle96\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/canon/ever%20essence%201734656.png' },
            { type: 'boorulink', ids: { derpi: 1734656, poner: 1734656, twi: 1381826, pony: 2307627 }, content: ['source'] }
        ]
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>OCs:'] },
            '>Bombshell shellbeam\n',
            'Made a :sunbeam: edit of Bombshell. For you as well.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/ocs/bombshell%20shellbeam.png' },
            { type: 'hr' },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>Snowponies:'] },
                    '>Frosty Flakes feeshbeam\n',
                    'Made a :sunbeam: edit of Frosty Flakes and combinied it with spinning fish meme. Originally for snowponies thread.',
                    {
                        type: 'imageswitcher', images: [
                            { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/frosty%20flakes%20feeshbeam.png', content: ['Stiker version'] },
                            { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/frosty%20flakes%20feeshbeam.gif', content: ['Animated'] },
                        ]
                    }
                ]
            },
            { type: 'hr' },
            '>Anonfilly\n',
            'It\'s just funny. Found on desuarchive. Don\'t know who made it. It isn\'t on any of the boorus (or at least the reverse search didn\'t find it). Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/anonfilly%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/anonfilly.png', content: ['Original'] },
                ]
            },
            { type: 'hr' },
            '>Fair Flyer by LockHeart\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/fair%20flyer%203476728%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/fair%20flyer%203476728.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3476728, poner: 7093493, twi: 3375042, pony: 3711116 }, content: ['source'] },
            { type: 'hr' },
            '>Soiree by TheBatFang\n',
            'Converted from gif to png and smoothed the rough edges (or at least tried to) from binary gif transparency.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/soiree%203211943%20smoothed.png', content: ['Smoothed'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/soiree%203211943.gif', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3211943, poner: 6798593, twi: 3070246, pony: 3448163 }, content: ['source'] },
            { type: 'hr' },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>"shamelessly, my own ocs"'] },
                    '>GoogleDrive/OCs/ponicemare/ccpreenbetter.png\n',
                    'Idk who that mare is but made a IWTCIRD edit of her.',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/ocs/gd/ponicemare/ccpreenbetter iwtcipb.png' },
                    { type: 'hr' },
                    '>GoogleDrive/OCs/catalina plone/PonilinaGray.png\n',
                    'Removed the background.',
                    {
                        type: 'imageswitcher', images: [
                            { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/gd/catalina%20plone/ponilinagray%20nobg.png', content: ['No background'] },
                            { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/gd/catalina%20plone/ponilinagray.png', content: ['Original'] },
                        ]
                    },
                    { type: 'hr' },
                    '>GoogleDrive/OCs//ss/ oc/Happy Heartsong - heartbeam\n',
                    'Made a :sunbeam: edit of your /ss/ oc.',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/ocs/gd/ss%20oc/happy%20heartsong%20heartbeam.png' }
                ]
            },
            { type: 'hr' },
            '>Tuesday by rirurirue\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/tuesday%202957692%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/ocs/tuesday%202957692.jpg', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 2957692, poner: 2957692, twi: 2701022, pony: 3096619 }, content: ['source'] }
        ]
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>Real Horse:'] },
            '>Verity by TheBatFang\n',
            'Waifu2x\'d it.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/real%20horse/verity%203211296%20waifu2x.png', content: ['Waifu2x\'d'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/real%20horse/verity%203211296.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3211296, poner: 6798006, twi: 3064574, pony: 3447542 }, content: ['source'] },
            { type: 'hr' },
            '>SGT. Reckless by Jargon Scott\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/real%20horse/sgt.%20reckless%203352928%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/real%20horse/sgt.%20reckless%203352928.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3352928, poner: 6950381, twi: 3216479, pony: 3588287 }, content: ['source'] },
            { type: 'hr' },
            '>Laili mare stare\n',
            'Made mare stare edit of Laili. Sorry couldn\'t do the head thingy.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/real%20horse/laili%20mare%20stare.png' }
        ]
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>"Mares I simply think are extra pretty because I keep making the favorites list too long":'] },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>Apple mares:'] },
                    '>Apple Fritter by nano23823\n',
                    'Used as is (exported svg at a higher resolution).',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/apple%20fritter%202463066.png' },
                    { type: 'boorulink', ids: { derpi: 2463066, poner: 2463066, twi: 2361274, pony: 2687371 }, content: ['source'] },
                    { type: 'hr' },
                    '>Apple Flora by vomitvomiting\n',
                    'Removed the background.',
                    {
                        type: 'imageswitcher', images: [
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/apple%20flora%203454037%20nobg.png', content: ['No background'] },
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/apple%20flora%203454037.png', content: ['Original'] },
                        ]
                    },
                    { type: 'boorulink', ids: { derpi: 3454037, poner: 7067522, twi: 3348986, pony: 3688363 }, content: ['source'] }
                ]
            },
            { type: 'hr' },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>Crystal mares:'] },
                    '>Arctic Lily by mandumustbasukanemen\n',
                    'Used as is.',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/arctic%20lily%202851261.jpg' },
                    { type: 'boorulink', ids: { derpi: 2851261, poner: 2851261, twi: 2693644, pony: 3090279 }, content: ['source'] }
                ]
            },
            { type: 'hr' },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>Guardsmares:'] },
                    '>Gun guardsmare by Neuro\n',
                    'I don\'t know whats her name. On boorus she is just tagged as "oc". No name. Idk maybe Neuro gave her a name but I\'m not combing through every guardsmares/kinderquestria thread to find out.\n',
                    'Too long to list the number of edits I did to her.',
                    {
                        type: 'imageswitcher', images: [
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/gun%20guardsmare%206132305%20edit.png', content: ['Edit'] },
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/gun%20guardsmare%206132305.gif', content: ['Original'] },
                        ]
                    },
                    { type: 'boorulink', ids: { poner: 6132305, twi: 2333455, pony: 2813582 }, content: ['source'] }
                ]
            },
            { type: 'hr' },
            {
                type: 'subsection',
                content: [
                    { type: 'midtext', content: ['>Maid mares:'] },
                    '>Derpy Hooves by CyanLightning\n',
                    'Used as is.',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/derpy%20hooves%202143394.png' },
                    { type: 'boorulink', ids: { derpi: 2143394, poner: 2143394, twi: 1716088, pony: 35011 }, content: ['source'] },
                    { type: 'hr' },
                    '>Red Ribbons by nicogamer3000\n',
                    'Used as is.',
                    { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/red%20ribbons%202845660.png' },
                    { type: 'boorulink', ids: { derpi: 2845660, poner: 6512757, twi: 2687977, pony: 3084673 }, content: ['source'] },
                    { type: 'hr' },
                    '>Roseluck by spoonie\n',
                    'Removed the background.',
                    {
                        type: 'imageswitcher', images: [
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/roseluck%203343006%20nobg.png', content: ['No background'] },
                            { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/roseluck%203343006.png', content: ['Original'] },
                        ]
                    },
                    { type: 'boorulink', ids: { derpi: 3343006, poner: 6939174, twi: 3205452, pony: 3578356 }, content: ['source'] }
                ]
            },
            { type: 'hr' },
            '>Golden Glitter by vector-brony\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/golden%20glitter%20475002.png' },
            { type: 'boorulink', ids: { derpi: 475002, poner: 475002, twi: 347646, pony: 1947178 }, content: ['source'] },
            { type: 'hr' },
            '>Lilac Luster\n',
            'Vectored Lilac Luster for you. For print had to disable transparency and make the tesellation pattern more opaque. (might be just because Its my first time vectoring a crystal mare and I suck at half transparent colors, because I didn\'t have to do this for the mare above)',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/lilac%20luster.png', content: ['With transparency'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/lilac%20luster%20print.png', content: ['Print version'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3500111, poner: 7119460, twi: 3401018, pony: 3733981 }, content: ['source'] },
            { type: 'hr' },
            '>Bow Bonnet brazzers\n',
            'This is a screencap from S6E08 at 13:42.447 with the brazzers logo edited in. There is an original image on booru but it used a stretched 720p screencap so I remade this meme with 1080p screencap without scaling.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/bow%20bonnet%201153912%20brazzers.png' },
            { type: 'boorulink', ids: { derpi: 1153912, poner: 1153912, twi: 1958593, pony: 1507304 }, content: ['source'] },
            { type: 'hr' },
            '>Evening Stroll strolling in the evening\n',
            'Vectored Evening Stroll for you. Source is a screencap from S6E08 at 13:24.637.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/evening%20stroll%20strolling.png' },
            { type: 'boorulink', ids: { derpi: 3502361, poner: 7122041, twi: 3403597, pony: 3736009 }, content: ['source'] },
            { type: 'hr' },
            '>Sooty Sweeps by Jargon Scott\n',
            'Recreated it in vector because the original was too small for stickers.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/sooty%20sweeps%201158889%20vector.png', content: ['My recreation'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/sooty%20sweeps%201158889.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 1158889, poner: 1158889, twi: 898432, pony: 2048516 }, content: ['original'] },
            ' ',
            { type: 'boorulink', ids: { derpi: 3502669, poner: 7122155, twi: 3404134, pony: 3736583 }, content: ['mine (svg)'] },
            '\n',
            { type: 'spoiler', content: ['That\'s 3 mares from the same episode in a row. You\'ve been rewatching Hearth\'s Warming Tail when you made this list, haven\'t you?'] },
            { type: 'hr' },
            '>Honey Bulb it\'s over\n',
            'Vectored Honey Bulb for you. Added "it\'s over" text because of the expression.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/honey%20bulb%20its%20over.png', content: ['With text'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/honey%20bulb.png', content: ['Without'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3501632, poner: 7121214, twi: 3402762, pony: 3735332 }, content: ['source'] },
            ' ',
            { type: 'boorulink', ids: { derpi: 3501634, poner: 7121218, twi: 3402763, pony: 3735333 }, content: ['with text'] },
            { type: 'hr' },
            '>Swan Song by belka-sempai\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/swan%20song%203107619%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/swan%20song%203107619.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3107619, poner: 3107619, twi: 2957139, pony: 3343459 }, content: ['source'] },
            { type: 'hr' },
            '>Minty Green sit\n',
            'Vectored Minty Green sitting. For you.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/minty%20green%20sit.png' },
            { type: 'boorulink', ids: { derpi: 3500356, poner: 7119777, twi: 3401338, pony: 3733997 }, content: ['source'] },
            { type: 'hr' },
            '>Cantora by starryshineviolet\n',
            'Used as is.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/cantora%203127822.png' },
            { type: 'boorulink', ids: { derpi: 3127822, poner: 3127822, twi: 2977767, pony: 3363590 }, content: ['source'] },
            { type: 'hr' },
            '>Serena by by Vultraz\n',
            'Removed the background.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/serena%203119018%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/serena%203119018.png', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3119018, poner: 6697498, twi: 2968782, pony: 3354866 }, content: ['source'] },
            { type: 'hr' },
            '>Almond Joy\n',
            'Vectored Almond Joy for you. Source is a screencap from S9E13 at 12:14.609.\n',
            { type: 'spoiler', content: ['Screw you for making me suffer through the meme faces of Between the Dusk and the Dawn just to get a screencap of her.'] },
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra%20pretty/almond%20joy.png' },
            { type: 'boorulink', ids: { derpi: 3501263, poner: 7120824, twi: 3402372, pony: 3735325 }, content: ['source'] }
        ]
    },
    {
        type: 'section',
        content: [
            { type: 'bigtext', content: ['>Extra:'] },
            '>Roseluck tile I used for the background of the envelope and this page.\n',
            'Edited ',
            { type: 'boorulink', ids: { derpi: 3438048, poner: 7060004, twi: 3320004, pony: 3670004 }, content: ['this Derpy tile'] },
            ' with Roseluck.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra/roseluck%20tile.png' },
            { type: 'boorulink', ids: { poner: 7127634, twi: 3408938 }, content: ['on booru'] },
            { type: 'hr' },
            '>Sugar Stamp I used on stamps\n',
            'Vectored Sugar Stamp with a christmas hat and a letter in her mouth. Becasue with a name like that it was only right to use her for the stamps.',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra/sugar%20stamp%20stamp.png' },
            { type: 'boorulink', ids: { derpi: 3518657, poner: 7140485, twi: 3753657, pony: 3420928 }, content: ['on booru'] },
            { type: 'hr' },
            '>Roseluck snoof\n',
            'The snoof popup image you saw when you opened this page (if it worked).',
            { type: 'img', src: 'https://firlin123.github.io/img/ss/hh2024/extra/r%20u%20flower.png' },
            { type: 'boorulink', ids: { derpi: 3516870, poner: 7138420, twi: 3418851, pony: 3751186 }, content: ['on booru'] },
            { type: 'hr' },
            '>Thursday\n',
            'Cut out the background. In here because I initially misread your list and thought you wanted this one instead of Tuesday. Thankfully I noticed the mistake BEFORE printing.',
            {
                type: 'imageswitcher', images: [
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra/thursday%203483750%20nobg.png', content: ['No background'] },
                    { image: 'https://firlin123.github.io/img/ss/hh2024/extra/thursday%203483750.jpg', content: ['Original'] },
                ]
            },
            { type: 'boorulink', ids: { derpi: 3483750, poner: 7101634, twi: 3383155, pony: 3718102 }, content: ['source'] }
        ]
    }
];

const defaultBooru = 'poner';

// Snoof popup
(() => {
    const snoofUrl = 'https://firlin123.github.io/img/ss/hh2024/extra/r%20u%20flower.png';
    const body = document.body;

    const blackBackground = document.createElement('div');
    blackBackground.style.position = 'fixed';
    blackBackground.style.top = '0';
    blackBackground.style.left = '0';
    blackBackground.style.width = '100%';
    blackBackground.style.height = '100%';
    blackBackground.style.background = 'linear-gradient(#458ac9, #fdfdd7)';
    blackBackground.style.opacity = '0';
    blackBackground.style.transition = 'opacity 1s ease';
    blackBackground.style.zIndex = '1000';
    blackBackground.style.display = 'flex';
    blackBackground.style.justifyContent = 'center';
    blackBackground.style.alignItems = 'center';

    const snoofImage = document.createElement('img');
    snoofImage.src = snoofUrl;
    snoofImage.style.maxWidth = '90vw';
    snoofImage.style.maxHeight = '90vh';
    snoofImage.style.opacity = '0';
    snoofImage.style.transform = 'translateY(-110vh)';
    snoofImage.style.transition = 'opacity 1s ease, transform 1s ease';
    snoofImage.style.zIndex = '1001';

    const snoofText = document.createElement('div');
    snoofText.innerText = 'You have been SNOOFED';
    snoofText.style.color = 'red';
    snoofText.style.fontSize = '7vh';
    snoofText.style.fontWeight = 'bold';
    snoofText.style.textAlign = 'center';
    snoofText.style.opacity = '0';
    snoofText.style.transition = 'opacity 1s ease';
    snoofText.style.position = 'absolute';
    snoofText.style.bottom = '6%';
    snoofText.style.zIndex = '1002';

    // Append elements to the background
    blackBackground.appendChild(snoofImage);
    blackBackground.appendChild(snoofText);
    body.appendChild(blackBackground);

    // Wait for the image to load before starting the animation
    snoofImage.onload = () => {
        setTimeout(() => {
            blackBackground.style.opacity = '1';
            snoofImage.style.opacity = '1';
            snoofImage.style.transform = 'translateY(0)';
            snoofText.style.opacity = '1';
        }, 100);

        // Hide after 5 seconds
        setTimeout(() => {
            blackBackground.style.opacity = '0';
            snoofImage.style.opacity = '0';
            snoofImage.style.transform = 'translateY(110vh)';
            snoofText.style.opacity = '0';

            // Remove elements after animation
            setTimeout(() => {
                body.removeChild(blackBackground);
            }, 1000);
        }, 5100);
    };
})();

function renderContent(content, container) {
    if (Array.isArray(content)) {
        for (const part of content) {
            renderContentPiece(part, container);
        }
        return;
    } else {
        throw new Error('Content must be an array');
    }
}

function renderContentPiece(content, container) {
    if (typeof content === 'string') {
        renderText(content, container);
        return;
    }
    switch (content.type) {
        case 'booruswitcher':
            renderBooruSwitcher(content, container);
            break;
        case 'img':
            renderImage(content, container);
            break;
        case 'link':
            renderLink(content, container);
            break;
        case 'boorulink':
            renderBooruLink(content, container);
            break;
        case 'spoiler':
            renderSpoiler(content, container);
            break;
        case 'bigtext':
            renderBigText(content, container);
            break;
        case 'midtext':
            renderMidText(content, container);
            break;
        case 'section':
            renderSection(content, container);
            break;
        case 'subsection':
            renderSubsection(content, container);
            break;
        case 'imageswitcher':
            renderImageSwitcher(content, container);
            break;
        case 'hr':
            renderHr(container);
            break;
        default:
            console.error('Unknown content type:', content);
            throw new Error('Unknown content type');
    }
}

function renderText(content, container) {
    const lines = content.split('\n');
    let first = true;
    for (const line of lines) {
        if (first) {
            first = false;
        }
        else {
            container.appendChild(document.createElement('br'));
        }
        if (line === '') continue;
        if (line.startsWith('>')) {
            const greentext = document.createElement('span');
            greentext.classList.add('greentext');
            greentext.textContent = line;
            container.appendChild(greentext);
        }
        else {
            container.appendChild(document.createTextNode(line));
        }
    }
}

let boorus = null;
let preferedBooru = null;

function renderBooruSwitcher(content, outerContainer) {
    const container = document.createElement('div');
    boorus = content.boorus;
    preferedBooru = boorus.find(booru => booru.id === defaultBooru) ?? boorus[0];
    container.classList.add('booru-switcher');
    const styles = [];
    for (const booru of boorus) {
        const button = document.createElement('button');
        button.textContent = booru.name;
        button.addEventListener('click', () => {
            preferedBooru = booru;
            container.querySelector('button.active').classList.remove('active');
            button.classList.add('active');
            updateBooruLinks();
        });
        const icon = document.createElement('span');
        icon.classList.add('booru-icon');
        icon.classList.add('booru-icon-' + booru.id);
        button.appendChild(icon);
        container.appendChild(button);
        styles.push(`.booru-icon-${booru.id} { background-image: url(${booru.icon}); }`);
        if (booru === preferedBooru) {
            button.classList.add('active');
        }
    }
    const style = document.createElement('style');
    style.textContent = styles.join('\n');
    container.appendChild(style);
    updateBooruLinks();
    outerContainer.appendChild(container);
}

function renderImage(content, container) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.classList.add('content-image');
    img.src = content.src;
    container.appendChild(img);
}

function renderLink(content, container) {
    const link = document.createElement('a');
    link.href = content.href;
    renderContent(content.content, link);
    container.appendChild(link);
}

function renderBooruLink(content, container) {
    const link = document.createElement('a');
    link.classList.add('booru-link');
    if (!content.ids) {
        console.error('Booru link must have ids:', content);
        throw new Error('Booru link must have ids');
    }
    for (const [id, value] of Object.entries(content.ids)) {
        link.dataset[id + 'Id'] = value;
    }
    let selectedBooru = preferedBooru;
    if (!(preferedBooru.id in content.ids)) {
        for (const booru of boorus) {
            if (booru.id in content.ids) {
                selectedBooru = booru;
                break;
            }
        }
    }
    link.href = selectedBooru.url + content.ids[selectedBooru.id];
    renderContent(content.content, link);
    const booruIcon = document.createElement('span');
    booruIcon.classList.add('booru-icon');
    booruIcon.classList.add('booru-icon-' + selectedBooru.id);
    link.appendChild(booruIcon);
    container.appendChild(link);
}

function renderSpoiler(content, container) {
    const spoiler = document.createElement('span');
    spoiler.classList.add('spoiler');
    renderContent(content.content, spoiler);
    container.appendChild(spoiler);
}

function renderBigText(content, container) {
    const bigText = document.createElement('h2');
    bigText.classList.add('big-text');
    renderContent(content.content, bigText);
    container.appendChild(bigText);
}

function renderMidText(content, container) {
    const midText = document.createElement('h3');
    midText.classList.add('mid-text');
    renderContent(content.content, midText);
    container.appendChild(midText);
}

function renderSection(content, container) {
    const section = document.createElement('section');
    section.classList.add('section');
    renderContent(content.content, section);
    container.appendChild(section);
}

function renderSubsection(content, container) {
    const subsection = document.createElement('section');
    subsection.classList.add('subsection');
    renderContent(content.content, subsection);
    container.appendChild(subsection);
}

function renderImageSwitcher(content, container) {
    const switcher = document.createElement('div');
    switcher.classList.add('image-switcher');

    const controls = document.createElement('div');
    controls.classList.add('controls');
    switcher.appendChild(controls);

    const images = content.images;
    const current = document.createElement('div');
    current.classList.add('current');
    switcher.appendChild(current);


    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.src = image.image;
        img.alt = image.content[0] || `Image ${i + 1}`;
        img.classList.add('content-image');
        if (i === 0) {
            current.appendChild(img);
        }
        const controlTab = document.createElement('button');
        renderContent(image.content, controlTab);
        controlTab.classList.add('control-tab');
        if (i === 0) {
            controlTab.classList.add('active');
        }
        controlTab.addEventListener('click', () => {
            current.innerHTML = '';
            current.appendChild(img);
            controls.querySelector('.control-tab.active').classList.remove('active');
            controlTab.classList.add('active');
        });
        controls.appendChild(controlTab);
    }

    container.appendChild(switcher);
}


function renderHr(container) {
    container.appendChild(document.createElement('hr'));
}

function updateBooruLinks() {
    const links = document.querySelectorAll('.booru-link');
    for (const link of links) {
        let selectedBooru = preferedBooru;
        if (!link.dataset[preferedBooru.id + 'Id']) {
            // Does not exist on the prefered booru, use the first one available
            for (const booru of boorus) {
                if (link.dataset[booru.id + 'Id']) {
                    selectedBooru = booru;
                    break;
                }
            }
        }
        link.href = selectedBooru.url + link.dataset[selectedBooru.id + 'Id'];
        const icon = link.querySelector('.booru-icon');
        for (const c of icon.classList) {
            if (c.startsWith('booru-icon-')) {
                icon.classList.remove(c);
            }
        }
        icon.classList.add('booru-icon-' + selectedBooru.id);
    }
}

renderContent(content, document.body);