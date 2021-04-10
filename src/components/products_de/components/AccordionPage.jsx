import React from 'react';

import { Container, Typography, List, ListItem, Divider } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AccordionPage = ({ classes }) => (
	<Container maxWidth="xs" className={`mb-4 ${classes.root}`}>
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography className={classes.heading}>Ordenar por Menor precio</Typography>
			</AccordionSummary>

			<AccordionDetails className="accordion w-100 px-0 pb-0">
				<List component="nav" aria-label="main mailbox folders" className="w-100 pb-0">
					<ListItem button className="list">
						<ListItemText primary="Mas relevantes" />
					</ListItem>
					
					<Divider />

					<ListItem button className="list">
						<ListItemText primary="Menor precio" />
					</ListItem>
					
					<Divider />

					<ListItem button className="list">
						<ListItemText primary="Mayor precio" />
					</ListItem>
				</List>
			</AccordionDetails>
		</Accordion>
	</Container>
)

export default AccordionPage;