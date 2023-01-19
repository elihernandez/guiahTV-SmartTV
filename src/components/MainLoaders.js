import React from 'react'
import { getState } from '../state'
import { onMount } from 'solid-js'
import { $ } from '../utils/dom'
import { LogoLoader, VideoLoader } from "./Loader"
import { fadeInElement } from '../utils/transition'

export default function MainLoaders() {
	const { isShowVideo } = getState().appState

	onMount(() => {
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