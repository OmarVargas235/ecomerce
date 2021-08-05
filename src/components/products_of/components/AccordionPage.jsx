import React from 'react';

import { Container, Typography, List, ListItem, Divider } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AccordionPage = ({ classes, handleChange, order}) => (
	<Container maxWidth="xs" className={`mb-4 ${classes.root}`}>
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Ordenar {order}</Typography>
			</AccordionSummary>

			<AccordionDetails className="accordion w-100 px-0 pb-0">
				<List component="nav" aria-label="main mailbox folders" className="w-100 pb-0">
					<ListItem
						button
						className="list"
						onClick={() => handleChange("por cantidad")}
					>
						<ListItemText primary="Por cantidad" />
					</ListItem>
					
					<Divider />

					<ListItem
						button
						className="list"
						onClick={() => handleChange("por menor precio")}
					>
						<ListItemText primary="Menor precio" />
					</ListItem>
					
					<Divider />

					<ListItem
						button
						className="list"
						onClick={() => handleChange("por mayor precio")}
					>
						<ListItemText primary="Mayor precio" />
					</ListItem>
				</List>
			</AccordionDetails>
		</Accordion>
	</Container>
)

export default AccordionPage;