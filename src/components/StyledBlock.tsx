import {Box} from "@mui/material";
import React, {ReactNode} from "react";

interface StyledBlockProps {
	children: ReactNode
	width?: string
	offset?: string
}

export const StyledBlock: React.FC<StyledBlockProps> = ({children, width, offset}) => {

	width = width ? width : "1rem"
	offset = offset ? offset : "-2rem"

	return (
		<Box display={"flex"}>
			<Box width={0}>
				<Box bgcolor={"primary.main"} width={width} ml={offset} borderRadius={2} height={1}></Box>
			</Box>
			<Box>
				{children}
			</Box>
		</Box>
	)
}

interface TopStyledBlockProps {
	children: ReactNode
	width?: string
	offset?: string
	height?: string
}

export const TopStyledBlock: React.FC<TopStyledBlockProps> = ({children, width, offset, height}) => {

	width = width ? width : "5rem"
	height = height ? height : "1rem"
	offset = offset ? offset : "-2rem"

	return (
		<Box display={"flex"} flexDirection={"column"}>
			<Box height={0}>
				<Box bgcolor={"primary.main"} width={width} height={height} mt={offset} borderRadius={2}></Box>
			</Box>
			<Box>
				{children}
			</Box>
		</Box>
	)
}

export default StyledBlock