import React, { useEffect } from 'react'
import { getState } from '../state'
import { $ } from '../utils/dom'
import { LogoLoader, VideoLoader } from "./Loader"
import { fadeInElement } from '../utils/transition'

export default function MainLoaders() {
	const { isShowVideo } = getState().appState

	useEffect(() => {
		function showVideo() {
			fadeInElement($('.video-loader'), '0', '1', '150')
			$('#video-logo').play()
		}

		isShowVideo
			? showVideo()
			: fadeInElement($('.logo-loader'), '0', '1', '150')
	})

	return (
		<>
			<LogoLoader />
			<VideoLoader />
		</>
	)
}