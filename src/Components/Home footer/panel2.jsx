import React from 'react'
import './Panel2.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Panel2() {
    return (
        <div className='panel-2-main-container'>
            <div className='panel-2-card'>
                <div className='card-header'>
                    <div className='title'>ShareWithMe</div>
                    <div className='social-icons'>
                        <ul>
                            <li>
                                <div class="facebook">
                                    <i><FacebookOutlinedIcon fontSize='large'/></i>
                                </div>
                            </li>
                            <li>
                                <div className="twitter">
                                    <i><TwitterIcon fontSize='large'/></i>
                                </div>
                            </li>
                            <li>
                                <div class="instagram" >
                                    <i><InstagramIcon fontSize='large'/></i>
                                </div>
                            </li>
                            <li>
                                <div class="google">
                                    <i><YouTubeIcon fontSize='large'/></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='panel-2-card-body'>
                    <span>
                        ShareWithMe is a <strong>free solution</strong> for sending and collecting files, 
                        there is <strong>no registration</strong> required, and unlimited usage! 
                        Transfer your files and large documents to one or several contacts or get a <strong>shareable link</strong> for 
                        your forums and social media in a few clicks. 
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Panel2