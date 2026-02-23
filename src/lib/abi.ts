export const CONTRACT_ABI = [
						{
							"anonymous": false,
							"inputs": [
								{
									"indexed": true,
									"internalType": "address",
									"name": "user",
									"type": "address"
								},
								{
									"indexed": false,
									"internalType": "string",
									"name": "fileRootHash",
									"type": "string"
								},
								{
									"indexed": false,
									"internalType": "string",
									"name": "fileName",
									"type": "string"
								},
								{
									"indexed": false,
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"name": "FileSummarized",
							"type": "event"
						},
						{
							"anonymous": false,
							"inputs": [
								{
									"indexed": true,
									"internalType": "address",
									"name": "user",
									"type": "address"
								},
								{
									"indexed": false,
									"internalType": "string",
									"name": "fileRootHash",
									"type": "string"
								},
								{
									"indexed": false,
									"internalType": "string",
									"name": "newSummary",
									"type": "string"
								},
								{
									"indexed": false,
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"name": "SummaryUpdated",
							"type": "event"
						},
						{
							"inputs": [
								{
									"internalType": "string",
									"name": "_title",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_author",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_category",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_fileRootHash",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_summary",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_fileName",
									"type": "string"
								}
							],
							"name": "addRecord",
							"outputs": [],
							"stateMutability": "nonpayable",
							"type": "function"
						},
						{
							"inputs": [],
							"name": "getMyRecords",
							"outputs": [
								{
									"components": [
										{
											"internalType": "string",
											"name": "title",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "author",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "category",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "fileRootHash",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "summary",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "fileName",
											"type": "string"
										},
										{
											"internalType": "uint256",
											"name": "timestamp",
											"type": "uint256"
										}
									],
									"internalType": "struct ResearchRecord.FileSummary[]",
									"name": "",
									"type": "tuple[]"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "_user",
									"type": "address"
								}
							],
							"name": "getRecordCount",
							"outputs": [
								{
									"internalType": "uint256",
									"name": "",
									"type": "uint256"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "address",
									"name": "_user",
									"type": "address"
								}
							],
							"name": "getUserRecords",
							"outputs": [
								{
									"components": [
										{
											"internalType": "string",
											"name": "title",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "author",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "category",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "fileRootHash",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "summary",
											"type": "string"
										},
										{
											"internalType": "string",
											"name": "fileName",
											"type": "string"
										},
										{
											"internalType": "uint256",
											"name": "timestamp",
											"type": "uint256"
										}
									],
									"internalType": "struct ResearchRecord.FileSummary[]",
									"name": "",
									"type": "tuple[]"
								}
							],
							"stateMutability": "view",
							"type": "function"
						},
						{
							"inputs": [
								{
									"internalType": "string",
									"name": "_fileRootHash",
									"type": "string"
								},
								{
									"internalType": "string",
									"name": "_newSummary",
									"type": "string"
								}
							],
							"name": "updateSummary",
							"outputs": [],
							"stateMutability": "nonpayable",
							"type": "function"
						}
];