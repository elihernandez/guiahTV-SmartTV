import { onMount, For } from 'solid-js'
import SpatialNavigation from '../../../utils/spatial-navigation'
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider'
import { isPressDown, isPressEnter, isPressLeft, isPressRight, isPressUp } from '../../../utils/keyboard'
import '../../../components/TinySlider/styles.css'
import { $ } from '../../../utils/dom'
import './styles.css'
import { fadeOutElement, fadeInElement } from '../../../utils/transition'
import transition from '../../../js/dist/transition'

export default function Catalogue({ data }){
	return (
		<div className="catalogue-vod">
			<div className="list-column">
				<VerticalSlider data={data} />
			</div>
		</div>
	)
}

function VerticalSlider({ data }){
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

		SpatialNavigation.add({
			selector: '.item-image',
			rememberSource: true,
			enterTo: 'last-element'
		})
	
		SpatialNavigation.makeFocusable()
		SpatialNavigation.focus('.item-image')

		setTimeout(() => {
			document.querySelector('.item-image').focus()
		}, 1000)
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

function ListRow({ data, handleMoveUp, handleMoveDown }){
	const { category: title } = data

	return(
		<div className="list-row">
			<div className="row-header">
				<div className="row-title">{title}</div>
			</div>
			<HorizontalSlider data={data} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} />
		</div>
	)
}

function HorizontalSlider({ data, handleMoveUp, handleMoveDown }){
	let slider
	let sliderRef
	const { cmData } = data
	
	onMount(() => {
		slider = tns({
			container: sliderRef,
			items: 5,
			speed: 400,
			slideBy: 1,
			autoplay: false,
			controls: true,
			center: false,
			loop: false,
			gutter: 16,
			nav: false,
			arrowKeys: false,
			touch: false,
			preventScrollOnTouch: true,
			controlsText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>']
		})
	})


	function handleMoveH(e){
		handleMoveUp(e)
		handleMoveDown(e)

		if(isPressRight(e)){
			slider.goTo('next')
		}

		if(isPressLeft(e)){
			slider.goTo('prev')
		}
	}

	return(
		<div ref={sliderRef} className="row-items row-slider">
			<For each={cmData}>
				{(movie) =>
					<ListItem
						key={`${movie.ContentType}-${movie.Registro}`}
						data={movie}
						handleMoveH={handleMoveH}
					/>
				}
			</For>
		</div> 
	)
}

function ListItem({ data, handleMoveH }){
	let isBackgroundTransition = false
	let timeoutBackgroundTransition
	const { HDPosterUrlLandscape, Title, Registro } = data

	function handleClick(e){
		if(isPressEnter(e)){
			console.log('Enter')
		}else{
			handleMoveH(e)
		}
	}

	function handleFocus(){
		const el = $('#background-image')
		clearTimeout(timeoutBackgroundTransition)
		if(!isBackgroundTransition){
			isBackgroundTransition = true
			transition.begin(el, ['opacity', '1', '0.5', '1000ms', '0'], {
				onBeforeChangeStyle: function() {
				},
				onTransitionEnd: function(element, finished) {
					if (!finished) return
					timeoutBackgroundTransition = setTimeout(() => {
						transition.begin(el, ['opacity', '0.5', '1', '1000ms', '0'], {
							onBeforeChangeStyle: function() {
								el.src = HDPosterUrlLandscape
							},
							onTransitionEnd: function(element, finished) {
								if (!finished) return
								isBackgroundTransition = false
							}
						})
					}, 500)
				}
			})
		}
	}

	return (
		<div className="list-item">
			<div className="item-image" onClick={handleClick} onKeyDown={handleClick} onFocus={handleFocus}>
				<img src={HDPosterUrlLandscape} alt={`Cover de ${Title}`} />
			</div>
		</div>
	)
}