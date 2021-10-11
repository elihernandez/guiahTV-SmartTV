import { onMount, For } from 'solid-js'
import { tns } from '../../../../node_modules/tiny-slider/src/tiny-slider'
import { isPressEnter, isPressLeft, isPressRight } from '../../../utils/keyboard'
import '../../../components/TinySlider/styles.css'
import '../../Vod/Catalogue/styles.css'
import './styles.css'

export default function Catalogue({ data }){

    console.log(data)

    onMount(() => {
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

    return (
		<div className="catalogue-live-tv">
            <div className="list-row">
                <HorizontalSlider data={data[0]} />
            </div>
		</div>
    )
}

function HorizontalSlider({ data }){
    console.log(data)
	let slider
	let sliderRef
	const { cmData } = data
	
	onMount(() => {
		slider = tns({
			container: sliderRef,
			items: 4,
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
				{(channel) =>
					<ListItem
						key={`${channel.Title}-${channel.SignalID}`}
						data={channel}
						handleMoveH={handleMoveH}
					/>
				}
			</For>
		</div> 
	)
}

function ListItem({ data, handleMoveH }){
    console.log(data)
	const { Poster, Name, SignalID } = data

	function handleClick(e){
		if(isPressEnter(e)){
			console.log('Enter')
		}else{
			handleMoveH(e)
		}
	}

	return (
		<div className="list-item">
            <div className="title-item">
                <div className="title">{Name}</div>
            </div>
			<div className="item-image" onClick={handleClick} onKeyDown={handleClick}>
				<img src={Poster} alt={`Cover de ${Name}`} />
			</div>
		</div>
	)
}