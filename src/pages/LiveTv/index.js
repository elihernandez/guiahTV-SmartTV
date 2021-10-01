import { createEffect, createSignal, Show } from 'solid-js'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

import Error from '../../components/Error'

export default function LiveTv(){
  const [getData, setData] = createSignal(null),
		[getError, setError] = createSignal(null),
		axios = useAxios(),
		route = 'live-tv',
		onBefore = () => {
			fetchData()
		},
		onLeave = () => {
			const page = $(`#${route}`)
			fadeOutElement(page, '1', '0', '150ms')
			setData(null)
			axios.reset()
		},
		fetchData = async () => {	
			const page = $(`#${route}`), loader  = $('.main-loader')
			fadeInElement(loader, '0', '1', '150ms')
			setError(null)

			try{
				const response = await axios.get('live-tv')
				setData(response)
			}catch(e){
				setError(e)
			}finally{
				fadeInElement(page, '0', '1', '150')
				fadeOutElement(loader, '1', '0', '150', '1000')
			}
		}

	createEffect(() => {
		if(axios.count() !== 0 && axios.count() <= 3){
			fetchData()
		}
	})

	useRouter({ route, onBefore, onLeave })

	return (
		<div className="section-wrapper" id={route} style={{ 'opacity': '0', 'display': 'none'}}>
			{/* <Show when={getData()}>
				<Catalogue data={getData()} />
			</Show> */}
			<Show when={getError()}>
				<Error {...axios} />
			</Show>
		</div>
	)
}