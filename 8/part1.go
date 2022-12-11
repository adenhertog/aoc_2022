package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Tree struct {
	Height  int
	Visible bool
	Score   int
}

func parseInput(filename string) [][]Tree {
	dat, _ := os.ReadFile(filename)
	lines := strings.Split(string(dat), "\n")

	trees := make([][]Tree, len(lines))

	for i, line := range lines {
		treeRow := strings.Split(line, "")
		trees[i] = make([]Tree, len(treeRow))
		for j, treeStr := range treeRow {
			height, _ := strconv.Atoi(treeStr)
			tree := Tree{
				Height:  height,
				Visible: false,
				Score:   0,
			}
			trees[i][j] = tree
		}

	}
	return trees
}

func findVisible(trees [][]Tree) {
	rows := len(trees)
	cols := len(trees[0])

	// Permute rows left to right
	for i, row := range trees {
		highest := -1
		for j, tree := range row {
			trees[i][j].Visible = tree.Visible || tree.Height > highest

			if tree.Height > highest {
				highest = tree.Height
			}
		}
	}

	// Permute rows right to left
	for i, row := range trees {
		highest := -1
		for j := len(row) - 1; j >= 0; j-- {
			tree := trees[i][j]
			trees[i][j].Visible = tree.Visible || tree.Height > highest

			if tree.Height > highest {
				highest = tree.Height
			}
		}
	}

	// Permute cols top to bottom
	for j := 0; j < cols; j++ {
		highest := -1
		for i := 0; i < rows; i++ {
			tree := trees[i][j]
			trees[i][j].Visible = tree.Visible || tree.Height > highest

			if tree.Height > highest {
				highest = tree.Height
			}
		}
	}

	// Permute cols bottom to top
	for j := 0; j < cols; j++ {
		highest := -1
		for i := rows - 1; i >= 0; i-- {
			tree := trees[i][j]
			trees[i][j].Visible = tree.Visible || tree.Height > highest

			if tree.Height > highest {
				highest = tree.Height
			}
		}
	}
}

func countVisible(trees [][]Tree) {
	count := 0
	for _, row := range trees {
		for _, tree := range row {
			if tree.Visible {
				count++
			}
		}
	}
	fmt.Print(count)
}

func part1() {
	trees := parseInput("input")
	findVisible(trees)
	countVisible(trees)
}
