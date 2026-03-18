import { FileText, PenTool, Building2, CheckCircle, ArrowRight } from 'lucide-react';

const processSteps = [
  { number: '01', title: 'Planning', icon: FileText },
  { number: '02', title: 'Design', icon: PenTool },
  { number: '03', title: 'Construct', icon: Building2 },
  { number: '04', title: 'Finishing', icon: CheckCircle },
];

interface ProcessSectionProps {
  subtitle: string;
}

export default function ProcessSection({ subtitle }: ProcessSectionProps) {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Our Process</h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6 group">
                    <div className="relative w-20 h-20 rounded-full bg-blue-600 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-6xl font-bold mb-2 text-slate-600">
                    {step.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">{step.title}</h3>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+50px)] w-[calc(100%-100px)] h-0.5 bg-slate-700">
                    <ArrowRight
                      className="absolute -right-2 -top-3 w-6 h-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
