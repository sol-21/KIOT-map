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
import markers from './components/markers/markers'
import SearchFilter from './components/SearchFilter'
import * as Location from 'expo-location'
import MapView, { Marker, MapTypes, Polyline } from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

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

	const [location, setLocation] = useState(initialMapState.region)
	// const [region, setRegion] = useState(null)
	const [polylineCoordinates, setPolylineCoordinates] = useState([])

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

	useEffect(() => {
		trackLocation()
	}, [])

	const trackLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			console.log('Permission to access location was denied')
			return
		}

		const { coords } = await Location.getCurrentPositionAsync({})
		setLocation(coords)
		setPolylineCoordinates([coords])
		await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.Highest,
				timeInterval: 5000,
				distanceInterval: 10
			},
			(newLocation) => {
				setPolylineCoordinates([...polylineCoordinates, newLocation.coords])
			}
		)

		Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 1000,
				distanceInterval: 1
			},
			(position) => {
				setLocation(position.coords)
				setPolylineCoordinates((coords) => [...coords, position.coords])
			}
		)
	}
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
		console.log(markerID)
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
			{location && (
				<MapView
					ref={_map}
					style={{ alignSelf: 'stretch', height: '100%' }}
					region={markerState.region}
					showsUserLocation={true}
					followsUserLocation={true}
					mapType={mapType}
					onPress={toggleMapType}>
					{polylineCoordinates.length > 0 && (
						<Polyline
							coordinates={polylineCoordinates}
							strokeWidth={5}
							strokeColor={'#f00'}
							lineDashPattern={[1]}
						/>
					)}
					{showMarkers()}
					<Marker coordinate={location} />
				</MapView>
			)}
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
				contentContainerStyle={styles.endPadding}
				pagingEnabled
				snapToInterval={CARD_WIDTH + 20}
				snapToAlignment='center'
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
	endPadding: {
		paddingRight: width - CARD_WIDTH
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
