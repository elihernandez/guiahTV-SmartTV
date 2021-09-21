import { useRef, useEffect } from 'react'
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider'
import '../../../../node_modules/tiny-slider/src/tiny-slider.css'
import { isPressDown, isPressLeft, isPressRight, isPressUp } from '../../../utils/keyboard'
import SpatialNavigation from '../../../utils/spatial-navigation'
import './styles.css'

export default function Catalogue({ data }){
	const listRef = useRef(null)
	const sliderVerticalRef = useRef(null)

	useEffect(() => {
		sliderVerticalRef.current = tns({
			container: listRef.current,
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
	}, [])

	return (
		<div className="catalogue-vod">
			<div className="list-column">
				<div ref={listRef} className="column-slider">
					{
						data.map((category) => {
							const key = category.category
							return <ListRow key={key} data={category} sliderVerticalRef={sliderVerticalRef} />
						})
					}
				</div>
			</div>
		</div>
	)
}

function ListRow({ data, sliderVerticalRef }){
	const listRef = useRef(null)
	const sliderRef = useRef(null)
	const { category: title, cmData } = data

	useEffect(() => {
		sliderRef.current = tns({
			container: listRef.current,
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
	}, [])

	function handleMoveH(e){
		if(isPressRight(e.nativeEvent)){
			sliderRef.current.goTo('next')
		}

		if(isPressLeft(e.nativeEvent)){
			sliderRef.current.goTo('prev')
		}

		if(isPressUp(e.nativeEvent)){
			sliderVerticalRef.current.goTo('prev')
		}

		if(isPressDown(e.nativeEvent)){
			sliderVerticalRef.current.goTo('next')
		}
	}

	return(
		<div className="list-row">
			<div className="row-header">
				<div className="row-title">{title}</div>
			</div>
			<div ref={listRef} className="row-items row-slider">
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