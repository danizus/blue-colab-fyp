import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
                <Wrench className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Blue Colab
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting skilled tradespeople with the best opportunities. Find your next job in the trades.
            </p>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Workers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Trade Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/signup?role=recruiter" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Find Workers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Blue Colab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
