"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PathSelectorProps {
  paths: Record<string, { title: string; icon: string; description: string }>
  selectedPath: string
  onPathChange: (path: string) => void
}

export function PathSelector({ paths, selectedPath, onPathChange }: PathSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-4 text-center">Choose Your Career Path</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(paths).map(([key, path]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all duration-300 border-border/50 hover:shadow-lg ${
              selectedPath === key ? "ring-2 ring-primary/50 bg-primary/5 shadow-lg" : "hover:border-primary/30"
            }`}
            onClick={() => onPathChange(key)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{path.icon}</div>
              <h4 className="font-heading font-semibold text-lg text-foreground mb-2">{path.title}</h4>
              <p className="text-muted-foreground text-sm">{path.description}</p>
              {selectedPath === key && (
                <Button size="sm" className="mt-3">
                  Selected
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
