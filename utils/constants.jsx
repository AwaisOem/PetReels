import {FaPaw,FaDog,FaCat, FaGamepad} from 'react-icons/fa';
import {BsCode ,BsPlusCircleFill} from 'react-icons/bs';
import {GiHorseHead ,GiOpenedFoodCan} from 'react-icons/gi';
import {SiSparkfun} from 'react-icons/si';
import {MdNightlife} from 'react-icons/md';
export const topics =  [

    {
        name: 'trending',
        icon: <SiSparkfun/>,
    },
    {
        name: 'cats',
        icon: <FaCat/>,
    },
    {
        name: 'dogs',
        icon: <FaPaw/>,
    },
    {
        name: 'horse',
        icon: <GiHorseHead/>,
    },
    {
        name: 'style',
        icon: <MdNightlife/>,
    },
    {
        name: 'cake',
        icon: <GiOpenedFoodCan/>,
    },
    {
        name: 'virtual',
        icon: <FaGamepad/>,
    },
    {
        name: 'coding',
        icon: <BsCode/>,
    },
    {
        name: 'others',
        icon: <BsPlusCircleFill/>,
    }
]