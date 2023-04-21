import React, { useState, useEffect, useRef } from 'react'
import {
	View,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TextInput,
	Dimensions,
	Animated,
	Image,
	Text,
	KeyboardAvoidingView
} from 'react-native'
import SearchFilter from './components/SearchFilter'
// import Icon from 'react-native-ionicons'
import MapView, { Marker, MapTypes } from 'react-native-maps'
const Images = [
	{
		uri: 'https://lh3.googleusercontent.com/p/AF1QipMfeojpM63DVnqA-5mUYCa3IVjvo4Wr0WyQqU8d=s1360-w1360-h1020'
	},
	{ uri: 'https://i.imgur.com/sNam9iJ.jpg' },
	{ uri: 'https://i.imgur.com/sNam9iJ.jpg' },
	{ uri: 'https://i.imgur.com/sNam9iJ.jpg' }
]
const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10
let markers = [
	{
		coordinate: {
			latitude: 11.050598125259235,
			longitude: 39.74936113917143
		},
		title: 'Dstv',
		id: '0',
		description: 'This is students Dstv',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.051932335911083,
			longitude: 39.74877221281011
		},
		title: 'Graduation Hall',
		id: '1',
		description: 'This is Graduation hall',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.049191370049732,
			longitude: 39.75009020332489
		},
		title: 'Gymnasium',
		id: '2',
		description: 'This is Gymnasium',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.052409750780946,
			longitude: 39.74680680588732
		},
		title: 'Administration',
		id: '3',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.049538214694493,
			longitude: 39.74787795702361
		},
		title: 'Student Union',
		id: '4',
		description: 'This is Students Union ',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.048806854002288,
			longitude: 39.748136559691964
		},
		title: 'Shops & Photocopy',
		id: '5',
		description: 'This is Shops and Photocopy services',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.051980952622452,
			longitude: 39.74669892974005
		},
		title: 'Bank & ATM',
		id: '6',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.051917857755775,
			longitude: 39.74954755161849
		},
		title: 'Cafeteria',
		id: '7',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.051719663305777,
			longitude: 39.74774489462865
		},
		title: 'Informatics College',
		id: '8',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.049860472683585,
			longitude: 39.750975168631776
		},
		title: 'White House',
		id: '9',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.054155277517383,
			longitude: 39.74977981771949
		},
		title: 'Ancharo',
		id: '10',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.0484609310966,
			longitude: 39.7501642678091
		},
		title: 'Informatics Laboratory',
		id: '11',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.0525979604587,
			longitude: 39.747515374116546
		},
		title: 'Registrar',
		id: '12',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.048409865394955,
			longitude: 39.74994340181729
		},
		title: 'Senior Males Dormitery',
		id: '13',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.048067640731928,
			longitude: 39.74880614529703
		},
		title: 'Female Dormitery',
		id: '14',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.048667588186346,
			longitude: 39.747775389216024
		},
		title: 'Sport Field',
		id: '15',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.050388206250837,
			longitude: 39.74833564759589
		},
		title: 'Class Rooms',
		id: '16',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.051413659369077,
			longitude: 39.74840629610825
		},
		title: 'Teachers Lounge',
		id: '17',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.049967737432604,
			longitude: 39.7472694681964
		},
		title: 'Students Lounge',
		id: '18',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.050011876127659,
			longitude: 39.747769422074825
		},
		title: 'Clinic',
		id: '19',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.048813881825973,
			longitude: 39.748614049799855
		},
		title: 'Informatics Library',
		id: '20',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.049228373433188,
			longitude: 39.748424284919764
		},
		title: 'Main Library',
		id: '21',
		description: 'This is Administration office',
		image: Images[0]
	},
	{
		coordinate: {
			latitude: 11.05054792918316,
			longitude: 39.747598179254
		},
		title: 'New Library',
		id: '22',
		description: 'This is Administration office',
		image: Images[0]
	}
]

const App = () => {
	const initialMapState = {
		markers,
		region: {
			latitude: 11.05079142734089,
			longitude: 39.746790066500026,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005
		}
	}

	const [mapType, setMapType] = useState('hybrid')
	const [markerState, SetMarkerState] = useState(initialMapState)
	const [input, setInput] = useState('')
	const [selectedMarkerid, setSelectedMarkerid] = useState(null)
	let mapIndex = 0
	let mapAnimation = new Animated.Value(0)

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3)
			if (index >= markerState.markers.length) {
				index = markerState.markers.length - 1
			}
			if (index <= 0) {
				index = 0
			}
			clearTimeout(regionTimeout)
			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index
					const { coordinate } = markerState.markers[index]
					_map.current.animateToRegion(
						{
							...coordinate,
							latitudeDelta: markerState.region.latitudeDelta,
							longitudeDelta: markerState.region.longitudeDelta
						},
						350
					)
				}
			}, 10)
		})
	})
	const interpolations = markerState.markers.map((marker, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			(index + 1) * CARD_WIDTH
		]

		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 1.5, 1],
			extrapolate: 'clamp'
		})

		return { scale }
	})
	const onListPressed = () => {}
	const onMarkerPress = (markerID) => {
		setSelectedMarkerid(Number(markerID))
		let x = markerID * CARD_WIDTH + markerID * 20

		_scrollView.current.scrollTo({ x: x, y: 0, animated: true })
	}
	const _map = useRef(null)
	const _scrollView = useRef(null)

	const toggleMapType = () =>
		setMapType(mapType === 'standard' ? 'satellite' : 'standard')

	const onRegionChange = (region) => {
		// console.log(region)
	}

	const showMarkers = () => {
		return markerState.markers.map((marker, index) => {
			const scaleStyle = {
				transform: [
					{
						scale: interpolations[index].scale
					}
				]
			}
			return (
				<Marker
					key={index}
					coordinate={marker.coordinate}
					onPress={() => onMarkerPress(marker.id)}>
					<Animated.View style={[styles.markerWrap]}>
						<Animated.Image
							source={require('./assets/pngwing.com.png')}
							style={[styles.marker, scaleStyle]}
							resizeMode='cover'
						/>
					</Animated.View>
				</Marker>
			)
		})
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<MapView
				ref={_map}
				style={{ alignSelf: 'stretch', height: '100%' }}
				onRegionChange={onRegionChange}
				region={markerState.region}
				mapType={mapType}
				onPress={toggleMapType}>
				{showMarkers()}
			</MapView>

			<View style={styles.searchBox}>
				<TextInput
					value={input}
					onChangeText={(text) => setInput(text)}
					placeholder='Search here'
					placeholderTextColor='#000'
					autoCapitalize='none'
					style={{ flex: 1, padding: 0 }}
				/>
			</View>
			<SearchFilter
				data={markerState.markers}
				region={markerState.region}
				input={input}
				setInput={setInput}
				mapRef={_map}
				scrollView={_scrollView}
				cardwidth={CARD_WIDTH}
				onMarkerPress={onMarkerPress}
			/>

			<Animated.ScrollView
				ref={_scrollView}
				horizontal
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				style={styles.scrollView}
				pagingEnabled
				snapToInterval={CARD_WIDTH + 20}
				snapToAlignment='center'
				// contentInset={{
				// 	top: 0,
				// 	left: SPACING_FOR_CARD_INSET,
				// 	bottom: 0,
				// 	right: SPACING_FOR_CARD_INSET
				// }}
				// contentContainerStyle={{
				// 	paddingHorizontal:
				// 		Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
				// }}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: mapAnimation
								}
							}
						}
					],
					{ useNativeDriver: true }
				)}>
				{markerState.markers.map((marker, index) => (
					<View
						style={styles.card}
						key={index}>
						<Image
							source={marker.image}
							style={styles.cardImage}
							resizeMode='cover'
						/>
						<View style={styles.textContent}>
							<Text
								numberOfLines={1}
								style={styles.cardTitle}>
								{marker.title}
							</Text>

							<Text
								numberOfLines={1}
								style={styles.cardTitle}>
								{marker.description}
							</Text>
						</View>
					</View>
				))}
			</Animated.ScrollView>
		</SafeAreaView>
	)
}
export default App
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	scrollView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 10
	},
	card: {
		elevation: 2,
		backgroundColor: '#FFF',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		marginHorizontal: 10,
		shadowColor: '#000',
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { x: 2, y: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH,
		overflow: 'hidden'
	},
	cardImage: {
		flex: 3,
		width: '100%',
		height: '100%',
		alignSelf: 'center'
	},
	textContent: {
		flex: 2,
		padding: 10
	},
	cardTitle: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	cardDescription: {
		fontSize: 12,
		color: '#444'
	},
	markerWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 50
	},
	marker: {
		width: 30,
		height: 30
	},
	searchBox: {
		marginTop: 5,
		position: 'absolute',
		flexDirection: 'row',
		backgroundColor: '#fff',
		width: '90%',
		alignSelf: 'center',
		borderRadius: 5,
		padding: 10,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	}
})
