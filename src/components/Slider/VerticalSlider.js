import { onMount, For } from 'solid-js'
import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider'
import '../../../node_modules/tiny-slider/src/tiny-slider.css'
import { isPressDown, isPressEnter, isPressLeft, isPressRight, isPressUp } from '../../utils/keyboard'

export function VerticalSlider({ data }){
	let slider
	let sliderRef

	onMount(() => {
		slider = tns({
			container: sliderRef,
			axis: 'vertical',
			items: 1,
			slideBy: 1,
			speed: 350,
			autoplay: false,
			controls: true,
			center: false,
			loop: false,
			gutter: 56,
			nav: false,
			arrowKeys: false,
			touch: false,
			preventScrollOnTouch: true,
			controlsText: ['<i class="fas fa-chevron-up"></i>','<i class="fas fa-chevron-down"></i>']
		})
	})

	const handleMoveUp = (e) => {
		if(isPressUp(e)){
			slider.goTo('prev')
		}
	}
	
	const handleMoveDown = (e) => {
		if(isPressDown(e)){
			slider.goTo('next')
		}
	}

	return (
		<div ref={sliderRef} className="column-slider">
			<For each={data}>
				{(category) =>
					<ListRow 
						key={category.category}
						data={category}
						handleMoveUp={handleMoveUp}
						handleMoveDown={handleMoveDown} 
					/>
				}
			</For>
		</div>
	)
}