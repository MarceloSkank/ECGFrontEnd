import axios from "axios";
import React, { Component } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
		};

		this.getData();
	}

    format_data(data){
        let date = new Date(data)

        return `${date.getDay()}/${date.getMonth()}/${date.getUTCFullYear()}`
    }
	getData() {
		console.log("passo");
		axios.get("https://ecgremote.herokuapp.com/list_all").then((result) => {
			const { data } = result;

			var arr = [];

			const { navigation } = this.props;

			data.forEach((element) => {
                //this.format_data(element["datetime"])

				arr.push(
					<>
						<DataTable.Row>
							<DataTable.Cell
								onPress={() =>
									navigation.navigate("chart", {
										id: element["_id"],
                                        resolution: element["resolution"],
                                        sampling_rate: element["sampling_rate"]
									})
								}
							>
								{element["userId"]}
							</DataTable.Cell>
							<DataTable.Cell
								onPress={() =>
									navigation.navigate("chart", {
										id: element["_id"],
                                        resolution: element["resolution"],
                                        sampling_rate: element["sampling_rate"]
									})
								}
							>
                                {element["title"]}
								
							</DataTable.Cell>
                            <DataTable.Cell onPress={() =>
									navigation.navigate("chart", {
										id: element["_id"],
                                        resolution: element["resolution"],
                                        sampling_rate: element["sampling_rate"]
									})
								}>
                                    {this.format_data(element["datetime"])}
                                    
                                
                            </DataTable.Cell>
						</DataTable.Row>
					</>
				);
			});
			this.setState({ data: arr });
		});
	}

	render() {
		return (
			<View>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Paciente</DataTable.Title>
						<DataTable.Title>
							Titulo do Exame
						</DataTable.Title>
						<DataTable.Title>Data</DataTable.Title>
					</DataTable.Header>

					{this.state.data}

					<DataTable.Pagination
						page={1}
						numberOfPages={3}
						onPageChange={(page) => {
							console.log(page);
						}}
						label="1-2 of 6"
					/>
				</DataTable>
			</View>
		);
	}
}
