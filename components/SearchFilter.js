import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native'

const SearchFilter = ({
	data,
	input,
	setInput,
	mapRef,
	region,
	scrollView,
	cardWidth,
	onMarkerPress
}) => {
	const onResultPress = (title) => {
		// }
	}
	return (
		<View style={styles.searchResults}>
			<FlatList
				data={data}
				renderItem={({ item }) => {
					if (
						input !== '' &&
						item.title.toLowerCase().includes(input.toLowerCase())
					) {
						return (
							<View style={{ marginVertical: 10 }}>
								<TouchableOpacity
									style={styles.listItem}
									onPress={() => onMarkerPress(item.id)}
									
								>
									<Text style={{ fontSize: 14, fontWeight: 'bold' }}>
										{item.title}
									</Text>
								</TouchableOpacity>
							</View>
						)
					}
				}}
				keyExtractor={(item) => item.id}
			/>
		</View>
	)
}

export default SearchFilter

const styles = StyleSheet.create({
	searchResults: {
		position: 'absolute',
		flexDirection: 'column',
		backgroundColor: '#fff',
		width: '90%',
		zIndex: 10,
		alignSelf: 'center',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginTop: 50,
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 10
	}
})
