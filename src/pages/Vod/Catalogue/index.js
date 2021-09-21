import { onMount } from 'solid-js'
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider'
import '../../../../node_modules/tiny-slider/src/tiny-slider.css'
import SpatialNavigation from '../../../utils/spatial-navigation'
import { isPressDown, isPressLeft, isPressRight, isPressUp } from '../../../utils/keyboard'
import './styles.css'

export default function Catalogue({ data }){
	let slider
	let sliderRef

	onMount(() => {
		slider = tns({
			container: sliderRef,
			axis: 'vertical',
			items: 3,
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
		<div className="catalogue-vod">
			<div className="list-column">
				<div ref={sliderRef} className="column-slider">
					{
						data.map((category) => {
							const key = category.category

							return <ListRow 
								key={key}
								data={category}
								handleMoveUp={handleMoveUp}
								handleMoveDown={handleMoveDown} 
							/>
						})
					}
				</div>
			</div>
		</div>
	)
}

function ListRow({ data, handleMoveUp, handleMoveDown }){
	let slider
	let sliderRef
	const { category: title, cmData } = data
	
	onMount(() => {
		slider = tns({
			container: sliderRef,
			items: 5,
			speed: 350,
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

		SpatialNavigation.add({
			selector: '.item-image',
			rememberSource: true,
			enterTo: 'last-element'
		})
	
		SpatialNavigation.makeFocusable()
		SpatialNavigation.focus()
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
		<div className="list-row">
			<div className="row-header">
				<div className="row-title">{title}</div>
			</div>
			<div ref={sliderRef} className="row-items row-slider">
				{
					cmData.map((movie) => {
						const key = `${movie.ContentType}-${movie.Registro}`
						return <ListItem key={key} data={movie} handleMoveH={handleMoveH} />
					})
				}
			</div>
		</div>
	)
}

function ListItem({ data, handleMoveH }){
	const { HDPosterUrlLandscape, Title } = data

	return (
		<div className="list-item">
			<div className="item-image" onKeyDown={handleMoveH}>
				<img src={HDPosterUrlLandscape} alt={`Cover de ${Title}`} />
			</div>
		</div>
	)
}