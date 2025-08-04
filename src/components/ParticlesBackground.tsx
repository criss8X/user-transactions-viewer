/** biome-ignore-all lint/suspicious/noArrayIndexKey: false positive */
import { useEffect, useState } from "react";

interface Particle {
	id: number;
	x: number;
	y: number;
	size: number;
	delay: number;
	duration: number;
	shape: "diamond" | "circle" | "hexagon" | "triangle";
}

export function ParticlesBackground() {
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		const generateParticles = () => {
			const newParticles: Particle[] = [];
			const particleCount = 50;

			for (let i = 0; i < particleCount; i++) {
				newParticles.push({
					id: i,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: Math.random() * 8 + 4,
					delay: Math.random() * 15,
					duration: Math.random() * 10 + 10,
					shape: ["diamond", "circle", "hexagon", "triangle"][
						Math.floor(Math.random() * 4)
					] as Particle["shape"],
				});
			}
			setParticles(newParticles);
		};

		generateParticles();
	}, []);

	const getShapeClasses = (shape: Particle["shape"], size: number) => {
		const baseClasses = `absolute animate-particle-drift`;
		const colors = [
			"bg-particle-primary",
			"bg-particle-secondary",
			"bg-particle-accent",
			"bg-gradient-to-br from-particle-primary to-particle-secondary",
			"bg-gradient-to-tr from-particle-secondary to-particle-accent",
		];
		const colorClass = colors[Math.floor(Math.random() * colors.length)];

		switch (shape) {
			case "diamond":
				return `${baseClasses} ${colorClass} transform rotate-45 animate-glow-pulse`;
			case "circle":
				return `${baseClasses} ${colorClass} rounded-full animate-float`;
			case "hexagon":
				return `${baseClasses} ${colorClass} transform rotate-12 animate-glow-pulse`;
			case "triangle":
				return `${baseClasses} bg-transparent border-l-[${size / 2}px] border-r-[${size / 2}px] border-b-[${size}px] border-l-transparent border-r-transparent border-b-particle-primary animate-float`;
			default:
				return `${baseClasses} ${colorClass}`;
		}
	};

	const getTriangleStyle = (size: number) => ({
		width: 0,
		height: 0,
		borderLeft: `${size / 2}px solid transparent`,
		borderRight: `${size / 2}px solid transparent`,
		borderBottom: `${size}px solid hsl(var(--particle-primary))`,
	});

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
			{/* Ethereum logo symbols floating */}
			<div className="absolute inset-0">
				{[...Array(8)].map((_, i) => (
					<div
						key={`eth-${i}`}
						className="absolute text-particle-primary opacity-20 animate-float select-none"
						style={{
							left: `${Math.random() * 90 + 5}%`,
							top: `${Math.random() * 90 + 5}%`,
							fontSize: `${Math.random() * 30 + 20}px`,
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${Math.random() * 4 + 6}s`,
						}}
					>
						Ξ
					</div>
				))}
			</div>

			{/* Geometric particles */}
			{particles.map((particle) => {
				if (particle.shape === "triangle") {
					return (
						<div
							key={particle.id}
							className="absolute animate-particle-drift"
							style={{
								left: `${particle.x}%`,
								top: `${particle.y}%`,
								animationDelay: `${particle.delay}s`,
								animationDuration: `${particle.duration}s`,
								...getTriangleStyle(particle.size),
							}}
						/>
					);
				}

				return (
					<div
						key={particle.id}
						className={getShapeClasses(particle.shape, particle.size)}
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							animationDelay: `${particle.delay}s`,
							animationDuration: `${particle.duration}s`,
						}}
					/>
				);
			})}

			{/* Gradient overlay for depth */}
			<div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/10 to-background/30 pointer-events-none" />

			{/* Subtle grid pattern */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `
            linear-gradient(hsl(var(--particle-primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--particle-primary)) 1px, transparent 1px)
          `,
					backgroundSize: "50px 50px",
				}}
			/>
		</div>
	);
}
